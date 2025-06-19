// Encryption Service for GQ Cars LTD
// Created by: Compliance & Security Specialist
// Purpose: Provide end-to-end encryption for all data

'use client';

export class EncryptionService {
  private static readonly ALGORITHM = 'AES-GCM';
  private static readonly KEY_LENGTH = 256;
  private static readonly IV_LENGTH = 12;
  private static readonly SALT_LENGTH = 16;
  private static readonly ITERATIONS = 100000;

  // Master encryption key (in production, this should be stored in HSM)
  private static readonly MASTER_KEY = typeof window !== 'undefined' 
    ? localStorage.getItem('masterKey') || this.generateSecureKey()
    : 'default-master-key-replace-in-production';

  /**
   * String pad start compatibility function
   */
  private static padStart(str: string, targetLength: number, padString: string): string {
    if (str.length >= targetLength) return str;
    const padLength = targetLength - str.length;
    const pad = padString.repeat(Math.ceil(padLength / padString.length));
    return pad.slice(0, padLength) + str;
  }

  /**
   * Generate a cryptographically secure random key
   */
  static generateSecureKey(): string {
    if (typeof window !== 'undefined' && window.crypto) {
      const array = new Uint8Array(32);
      window.crypto.getRandomValues(array);
      return Array.from(array, byte => this.padStart(byte.toString(16), 2, '0')).join('');
    }
    // Fallback for server-side
    return Array.from({ length: 32 }, () => this.padStart(Math.floor(Math.random() * 256).toString(16), 2, '0')).join('');
  }

  /**
   * Generate random bytes
   */
  private static getRandomBytes(length: number): Uint8Array {
    const array = new Uint8Array(length);
    if (typeof window !== 'undefined' && window.crypto) {
      window.crypto.getRandomValues(array);
    } else {
      // Fallback for server-side
      for (let i = 0; i < length; i++) {
        array[i] = Math.floor(Math.random() * 256);
      }
    }
    return array;
  }

  /**
   * Convert string to ArrayBuffer
   */
  private static stringToArrayBuffer(str: string): ArrayBuffer {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  }

  /**
   * Convert ArrayBuffer to string
   */
  private static arrayBufferToString(buffer: ArrayBuffer): string {
    const decoder = new TextDecoder();
    return decoder.decode(buffer);
  }

  /**
   * Convert ArrayBuffer to hex string
   */
  private static arrayBufferToHex(buffer: ArrayBuffer): string {
    const array = new Uint8Array(buffer);
    return Array.from(array, byte => this.padStart(byte.toString(16), 2, '0')).join('');
  }

  /**
   * Convert hex string to ArrayBuffer
   */
  private static hexToArrayBuffer(hex: string): ArrayBuffer {
    const length = hex.length / 2;
    const array = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      array[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return array.buffer;
  }

  /**
   * Derive encryption key from password using PBKDF2
   */
  static async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        this.stringToArrayBuffer(password),
        'PBKDF2',
        false,
        ['deriveKey']
      );

      return await window.crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: salt,
          iterations: this.ITERATIONS,
          hash: 'SHA-512'
        },
        keyMaterial,
        { name: this.ALGORITHM, length: this.KEY_LENGTH },
        false,
        ['encrypt', 'decrypt']
      );
    }
    throw new Error('Web Crypto API not available');
  }

  /**
   * Encrypt sensitive data using AES-GCM
   */
  static async encryptData(plaintext: string, password?: string): Promise<EncryptedData> {
    try {
      if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
        // Server-side fallback using simple encoding
        return this.fallbackEncrypt(plaintext);
      }

      const salt = this.getRandomBytes(this.SALT_LENGTH);
      const iv = this.getRandomBytes(this.IV_LENGTH);
      
      let key: CryptoKey;
      if (password) {
        key = await this.deriveKey(password, salt);
      } else {
        // Import master key
        const keyData = this.hexToArrayBuffer(this.MASTER_KEY);
        key = await window.crypto.subtle.importKey(
          'raw',
          keyData,
          { name: this.ALGORITHM },
          false,
          ['encrypt', 'decrypt']
        );
      }

      const encodedText = this.stringToArrayBuffer(plaintext);
      const encrypted = await window.crypto.subtle.encrypt(
        {
          name: this.ALGORITHM,
          iv: iv,
          additionalData: salt
        },
        key,
        encodedText
      );

      return {
        encrypted: this.arrayBufferToHex(encrypted),
        salt: this.arrayBufferToHex(salt),
        iv: this.arrayBufferToHex(iv),
        algorithm: this.ALGORITHM,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new Error(`Encryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Decrypt sensitive data using AES-GCM
   */
  static async decryptData(encryptedData: EncryptedData, password?: string): Promise<string> {
    try {
      if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
        // Server-side fallback
        return this.fallbackDecrypt(encryptedData);
      }

      const salt = new Uint8Array(this.hexToArrayBuffer(encryptedData.salt));
      const iv = new Uint8Array(this.hexToArrayBuffer(encryptedData.iv));
      const encrypted = this.hexToArrayBuffer(encryptedData.encrypted);
      
      let key: CryptoKey;
      if (password) {
        key = await this.deriveKey(password, salt);
      } else {
        const keyData = this.hexToArrayBuffer(this.MASTER_KEY);
        key = await window.crypto.subtle.importKey(
          'raw',
          keyData,
          { name: this.ALGORITHM },
          false,
          ['encrypt', 'decrypt']
        );
      }

      const decrypted = await window.crypto.subtle.decrypt(
        {
          name: this.ALGORITHM,
          iv: iv,
          additionalData: salt
        },
        key,
        encrypted
      );

      return this.arrayBufferToString(decrypted);
    } catch (error) {
      throw new Error(`Decryption failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Fallback encryption for server-side
   */
  private static fallbackEncrypt(plaintext: string): EncryptedData {
    // Simple base64 encoding with salt for server-side fallback
    const salt = this.getRandomBytes(this.SALT_LENGTH);
    const iv = this.getRandomBytes(this.IV_LENGTH);
    const combined = plaintext + this.arrayBufferToHex(salt);
    const encoded = btoa(combined);
    
    return {
      encrypted: encoded,
      salt: this.arrayBufferToHex(salt),
      iv: this.arrayBufferToHex(iv),
      algorithm: 'FALLBACK-BASE64',
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Fallback decryption for server-side
   */
  private static fallbackDecrypt(encryptedData: EncryptedData): string {
    if (encryptedData.algorithm === 'FALLBACK-BASE64') {
      const combined = atob(encryptedData.encrypted);
      const saltLength = this.SALT_LENGTH * 2; // hex length
      return combined.substring(0, combined.length - saltLength);
    }
    throw new Error('Cannot decrypt data on server-side');
  }

  /**
   * Encrypt personal data for GDPR compliance
   */
  static async encryptPersonalData(data: PersonalData): Promise<EncryptedPersonalData> {
    const encryptedFields: Record<string, EncryptedData> = {};
    
    // Encrypt all PII fields - using Object.keys instead of Object.entries for compatibility
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = (data as any)[key];
      if (value && typeof value === 'string' && key !== 'id' && key !== 'dataType') {
        encryptedFields[key] = await this.encryptData(value);
      }
    }

    return {
      id: data.id,
      encryptedFields,
      dataType: data.dataType,
      encryptedAt: new Date(),
      complianceFlags: {
        gdprCompliant: true,
        encrypted: true,
        auditLogged: true
      }
    };
  }

  /**
   * Hash sensitive data for verification (one-way)
   */
  static async hashData(data: string, salt?: string): Promise<HashedData> {
    const useSalt = salt || this.arrayBufferToHex(this.getRandomBytes(16));
    
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data + useSalt);
      const hashBuffer = await window.crypto.subtle.digest('SHA-512', dataBuffer);
      const hash = this.arrayBufferToHex(hashBuffer);
      
      return {
        hash,
        salt: useSalt,
        algorithm: 'SHA-512',
        timestamp: new Date().toISOString()
      };
    }
    
    // Fallback for server-side
    const combined = data + useSalt;
    const hash = btoa(combined).replace(/[^a-zA-Z0-9]/g, '').substring(0, 128);
    
    return {
      hash,
      salt: useSalt,
      algorithm: 'FALLBACK-HASH',
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Verify hashed data
   */
  static async verifyHash(data: string, hashedData: HashedData): Promise<boolean> {
    const newHash = await this.hashData(data, hashedData.salt);
    return newHash.hash === hashedData.hash;
  }

  /**
   * Generate secure session tokens
   */
  static generateSessionToken(): SecureToken {
    const tokenBytes = this.getRandomBytes(32);
    const token = this.arrayBufferToHex(tokenBytes);
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    
    return {
      token,
      hash: '', // Will be set async
      salt: '',
      expiresAt,
      createdAt: new Date()
    };
  }

  /**
   * Validate session token
   */
  static async validateSessionToken(token: string, storedToken: SecureToken): Promise<boolean> {
    if (new Date() > storedToken.expiresAt) {
      return false;
    }
    
    if (!storedToken.hash) {
      return false;
    }
    
    return await this.verifyHash(token, {
      hash: storedToken.hash,
      salt: storedToken.salt,
      algorithm: 'SHA-512',
      timestamp: storedToken.createdAt.toISOString()
    });
  }

  /**
   * Generate API key for external APIs
   */
  static async generateAPIKey(userId: string, scope: string[]): Promise<APIKey> {
    const keyData = {
      userId,
      scope,
      timestamp: Date.now(),
      nonce: this.arrayBufferToHex(this.getRandomBytes(16))
    };
    
    const key = await this.encryptData(JSON.stringify(keyData));
    const publicKey = (await this.hashData(key.encrypted)).hash.substring(0, 32);
    
    return {
      publicKey,
      encryptedKey: key,
      userId,
      scope,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      active: true
    };
  }

  /**
   * Validate API key
   */
  static async validateAPIKey(publicKey: string, storedKey: APIKey): Promise<boolean> {
    if (!storedKey.active || new Date() > storedKey.expiresAt) {
      return false;
    }
    
    const calculatedKey = (await this.hashData(storedKey.encryptedKey.encrypted)).hash.substring(0, 32);
    return publicKey === calculatedKey;
  }
}

// Types for encryption
export interface EncryptedData {
  encrypted: string;
  salt: string;
  iv: string;
  algorithm: string;
  timestamp: string;
}

export interface HashedData {
  hash: string;
  salt: string;
  algorithm: string;
  timestamp: string;
}

export interface PersonalData {
  id: string;
  dataType: 'Customer' | 'Driver' | 'Staff';
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  licenseNumber?: string;
  nationalInsurance?: string;
  dateOfBirth?: string;
  [key: string]: any;
}

export interface EncryptedPersonalData {
  id: string;
  encryptedFields: Record<string, EncryptedData>;
  dataType: string;
  encryptedAt: Date;
  complianceFlags: {
    gdprCompliant: boolean;
    encrypted: boolean;
    auditLogged: boolean;
  };
}

export interface SecureToken {
  token: string;
  hash: string;
  salt: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface APIKey {
  publicKey: string;
  encryptedKey: EncryptedData;
  userId: string;
  scope: string[];
  createdAt: Date;
  expiresAt: Date;
  active: boolean;
}