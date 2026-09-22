<?php
declare(strict_types=1);

ini_set('display_errors', '0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate');

function respond(int $status, array $payload): never
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES);
    exit;
}

function text_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value, 'UTF-8') : strlen($value);
}

function clean_line(mixed $value): string
{
    return trim(is_string($value) ? $value : '');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['success' => false, 'message' => 'Method not allowed.']);
}

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    respond(400, ['success' => false, 'message' => 'Invalid request.']);
}

$firstName = clean_line($data['firstName'] ?? '');
$lastName = clean_line($data['lastName'] ?? '');
$email = clean_line($data['email'] ?? '');
$telephone = clean_line($data['telephone'] ?? '');
$message = trim(is_string($data['message'] ?? null) ? $data['message'] : '');
$honeypot = clean_line($data['website'] ?? '');
$startedAt = filter_var($data['form_started_at'] ?? null, FILTER_VALIDATE_INT);

if ($honeypot !== '') {
    respond(400, ['success' => false, 'message' => 'Invalid submission.']);
}

$elapsed = $startedAt ? time() - $startedAt : 0;
if ($elapsed < 2 || $elapsed > 86400) {
    respond(429, ['success' => false, 'message' => 'Please wait a moment, refresh the page, and try again.']);
}

session_name('ngs_contact');
session_start(['cookie_httponly' => true, 'cookie_samesite' => 'Strict', 'use_strict_mode' => true]);
$lastSubmission = (int) ($_SESSION['last_submission'] ?? 0);
if ($lastSubmission && time() - $lastSubmission < 30) {
    respond(429, ['success' => false, 'message' => 'Please wait before sending another message.']);
}

$errors = [];
if ($firstName === '' || text_length($firstName) > 60 || preg_match('/[\r\n]/', $firstName)) $errors['firstName'] = 'Enter a valid first name.';
if ($lastName === '' || text_length($lastName) > 60 || preg_match('/[\r\n]/', $lastName)) $errors['lastName'] = 'Enter a valid last name.';
if ($email === '' || text_length($email) > 254 || preg_match('/[\r\n]/', $email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errors['email'] = 'Enter a valid email address.';
if ($telephone !== '' && (text_length($telephone) > 30 || preg_match('/[\r\n]/', $telephone) || !preg_match('/^[0-9+().\-\s]{7,30}$/', $telephone))) $errors['telephone'] = 'Enter a valid telephone number or leave it blank.';
if ($message === '' || text_length($message) > 3000) $errors['message'] = 'Enter a message of 3,000 characters or fewer.';

if ($errors) {
    respond(422, ['success' => false, 'message' => 'Please correct the highlighted fields.', 'errors' => $errors]);
}

$recipient = 'info@naomigregorysalon.com';
$from = 'do-not-reply@naomigregorysalon.com';
$subject = 'New website message from ' . $firstName . ' ' . $lastName;
$phoneLine = $telephone !== '' ? $telephone : 'Not provided';
$body = "A new message was submitted through naomigregorysalon.com.\n\n"
    . "Name: {$firstName} {$lastName}\n"
    . "Email: {$email}\n"
    . "Telephone: {$phoneLine}\n\n"
    . "Message:\n{$message}\n";
$headers = [
    'From: Naomi Gregory Salon, LLC Website <' . $from . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . PHP_MAJOR_VERSION,
];

$testMode = getenv('NGS_CONTACT_TEST_MODE') === '1';
$accepted = $testMode || @mail($recipient, $subject, $body, implode("\r\n", $headers));
if (!$accepted) {
    respond(500, ['success' => false, 'message' => 'We could not send your message. Please try again or contact us by phone.']);
}

$_SESSION['last_submission'] = time();
respond(200, ['success' => true, 'message' => 'Your message was accepted.', 'testMode' => $testMode]);
