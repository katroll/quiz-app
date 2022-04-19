class User < ApplicationRecord
    has_many :grades, dependent: :destroy
    
    has_many :users_classes
    has_many :spctc_classes, through: :users_classes

    validates :username, uniqueness: true
    validates :username, presence: true
    validates :first_name, presence: true
    validates :last_name, presence: true

    has_secure_password
    
    def password=(new_password)
        salt = BCrypt::Engine::generate_salt
        self.password_digest = BCrypt::Engine::hash_secret(new_password, salt)
    end

    def authenticate(password)
        salt = password_digest[0..28]
        return nil unless BCrypt::Engine::hash_secret(password, salt) == self.password_digest
        self
    end

end
