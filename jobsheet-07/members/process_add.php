<?php
session_start();

// 1. Kasus belum tertangani: Mencegah akses langsung via URL (GET request)
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $_SESSION['flash'] = ['type' => 'error', 'message' => 'Invalid request method. Please submit the form.'];
    header('Location: add.php');
    exit;
}

$name = trim($_POST['name'] ?? '');
$memberId = trim($_POST['member_id'] ?? '');
$address = trim($_POST['address'] ?? '');
$phone = trim($_POST['phone'] ?? '');

$errors = [];

// 2. Validasi Nama
if ($name === '') {
    $errors[] = "Name is required.";
} elseif (strlen($name) < 3) {
    $errors[] = "Name must be at least 3 characters long.";
}

// 3. Validasi Member ID (Wajib & Format)
if ($memberId === '') {
    $errors[] = "Member ID is required.";
} elseif (!preg_match('/^[a-zA-Z0-9-]+$/', $memberId)) {
    $errors[] = "Member ID may only contain letters, numbers, and hyphens.";
}

// 4. Validasi Duplikasi Member ID (Cek apakah ID sudah dipakai)
if (!isset($_SESSION['members'])) {
    $_SESSION['members'] = [];
}

foreach ($_SESSION['members'] as $existingMember) {
    if (strcasecmp($existingMember['member_id'], $memberId) === 0) {
        $errors[] = "Member ID '{$memberId}' is already registered.";
        break;
    }
}

// 5. Validasi Nomor Telepon (Jika diisi, pastikan format nomor valid 9-15 digit)
if ($phone !== '' && !preg_match('/^[0-9+\-\s]{9,15}$/', $phone)) {
    $errors[] = "Phone number is invalid (must be 9-15 digits).";
}

// Jika terdapat error validasi
if (!empty($errors)) {
    $_SESSION['flash'] = ['type' => 'error', 'message' => implode(' ', $errors)];
    header('Location: add.php');
    exit;
}

// Simpan data jika validasi lolos
$_SESSION['members'][] = [
    'name' => $name,
    'member_id' => $memberId,
    'address' => $address,
    'phone' => $phone,
];

$_SESSION['flash'] = ['type' => 'success', 'message' => 'Member added successfully.'];
header('Location: list.php');
exit;