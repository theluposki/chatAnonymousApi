CREATE TABLE
    IF NOT EXISTS users (
        id VARCHAR(36) PRIMARY KEY,
        nickname VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(60) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE
    IF NOT EXISTS conversations (
        id VARCHAR(36) PRIMARY KEY,
        senderNickname VARCHAR(255) NOT NULL,
        sender VARCHAR(60) NOT NULL,
        receiverNickname VARCHAR(255) NOT NULL,
        receiver VARCHAR(60) NOT NULL,
        message LONGTEXT NOT NULL,
        status ENUM('pending', 'done') DEFAULT 'pending',
        uuidMessage VARCHAR(36),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE
    IF NOT EXISTS socket_user_mapping (
        user_id VARCHAR(36) PRIMARY KEY,
        socket_id VARCHAR(255)
    );
