# Sequelize CLI - Hướng dẫn chi tiết cho Developer

## 📋 Mục lục
1. [Khởi tạo dự án Sequelize](#khởi-tạo-dự-án-sequelize)
2. [Migration](#migration)
3. [Seeder](#seeder)
4. [Best Practices](#best-practices)
5. [Advanced Patterns](#advanced-patterns)
6. [Production Tips](#production-tips)

---

## 🚀 Khởi tạo dự án Sequelize

### 1. Cài đặt dependencies
```bash
# Core packages
npm install sequelize mysql2
npm install --save-dev sequelize-cli

# Hoặc với yarn
yarn add sequelize mysql2
yarn add -D sequelize-cli
```

### 2. Khởi tạo cấu trúc dự án
```bash
# Khởi tạo Sequelize
npx sequelize-cli init

# Cấu trúc được tạo:
# ├── config/
# │   └── config.json
# ├── migrations/
# ├── models/
# │   └── index.js
# └── seeders/
```

### 3. Cấu hình .sequelizerc (Optional - Custom paths)
```javascript
// .sequelizerc
const path = require('path');

module.exports = {
  'config': path.resolve('src/configs', 'database.js'),
  'models-path': path.resolve('src/db', 'models'),
  'seeders-path': path.resolve('src/db', 'seeders'),
  'migrations-path': path.resolve('src/db', 'migrations')
};
```

### 4. Cấu hình database.js
```javascript
// src/configs/database.js
require('dotenv').config();

const config = {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'shop_dev',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log, // Enable trong dev
    define: {
      timestamps: true,
      underscored: false, // Dùng camelCase
      freezeTableName: true, // Không pluralize table names
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    username: process.env.TEST_DB_USER || 'root',
    password: process.env.TEST_DB_PASSWORD || '',
    database: process.env.TEST_DB_NAME || 'shop_test',
    host: process.env.TEST_DB_HOST || 'localhost',
    port: process.env.TEST_DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Tắt logging trong test
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true,
    }
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Tắt logging trong production
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true,
    },
    pool: {
      max: 20,
      min: 5,
      acquire: 60000,
      idle: 10000
    },
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        rejectUnauthorized: false
      } : false
    }
  }
};

module.exports = config;
```

---

## 🔄 Migration

### 1. Tạo migration
```bash
# Tạo migration mới
npx sequelize-cli migration:generate --name create-users-table
npx sequelize-cli migration:generate --name add-column-to-users
npx sequelize-cli migration:generate --name create-index-users-email
```

### 2. Template migration chuẩn
```javascript
// migrations/20250711000000-create-users-table.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 50]
        }
      },
      lastName: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [1, 50]
        }
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          len: [5, 100]
        }
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
        validate: {
          len: [6, 255]
        }
      },
      phoneNumber: {
        type: Sequelize.STRING(15),
        allowNull: true,
        validate: {
          is: /^[0-9+\-\s()]+$/
        }
      },
      avatar: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT' // Không cho xóa role nếu còn user
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    // Tạo indexes
    await queryInterface.addIndex('users', ['email'], {
      unique: true,
      name: 'users_email_unique'
    });
    
    await queryInterface.addIndex('users', ['roleId'], {
      name: 'users_role_id_index'
    });
    
    await queryInterface.addIndex('users', ['isActive'], {
      name: 'users_is_active_index'
    });
  },

  async down(queryInterface, Sequelize) {
    // Xóa indexes trước
    await queryInterface.removeIndex('users', 'users_email_unique');
    await queryInterface.removeIndex('users', 'users_role_id_index');
    await queryInterface.removeIndex('users', 'users_is_active_index');
    
    // Xóa table
    await queryInterface.dropTable('users');
  }
};
```

### 3. Migration thêm/sửa/xóa cột
```javascript
// migrations/20250711000001-add-column-to-users.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Thêm cột
    await queryInterface.addColumn('users', 'dateOfBirth', {
      type: Sequelize.DATEONLY,
      allowNull: true,
      after: 'phoneNumber' // MySQL specific
    });
    
    // Sửa cột (MySQL)
    await queryInterface.changeColumn('users', 'phoneNumber', {
      type: Sequelize.STRING(20), // Tăng độ dài
      allowNull: true
    });
    
    // Thêm index
    await queryInterface.addIndex('users', ['dateOfBirth'], {
      name: 'users_date_of_birth_index'
    });
  },

  async down(queryInterface, Sequelize) {
    // Xóa index
    await queryInterface.removeIndex('users', 'users_date_of_birth_index');
    
    // Rollback thay đổi cột
    await queryInterface.changeColumn('users', 'phoneNumber', {
      type: Sequelize.STRING(15),
      allowNull: true
    });
    
    // Xóa cột
    await queryInterface.removeColumn('users', 'dateOfBirth');
  }
};
```

### 4. Chạy migration
```bash
# Chạy tất cả migration chưa được áp dụng
npx sequelize-cli db:migrate

# Rollback migration gần nhất
npx sequelize-cli db:migrate:undo

# Rollback tất cả migrations
npx sequelize-cli db:migrate:undo:all

# Rollback đến migration cụ thể
npx sequelize-cli db:migrate:undo:all --to 20250711000000-create-users-table.js

# Kiểm tra status migration
npx sequelize-cli db:migrate:status
```

---

## 🌱 Seeder

### 1. Tạo seeder
```bash
# Tạo seeder mới
npx sequelize-cli seed:generate --name demo-roles
npx sequelize-cli seed:generate --name demo-users
npx sequelize-cli seed:generate --name demo-products
```

### 2. Template seeder chuẩn
```javascript
// seeders/20250711000000-demo-roles.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = [
      {
        id: 1,
        name: 'Admin',
        description: 'Full system access',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Manager',
        description: 'Management access',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        name: 'User',
        description: 'Basic user access',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('roles', roles, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
```

```javascript
// seeders/20250711000001-demo-users.js
'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash passwords
    const saltRounds = 10;
    const adminPassword = await bcrypt.hash('admin123', saltRounds);
    const userPassword = await bcrypt.hash('user123', saltRounds);

    const users = [
      {
        firstName: 'Admin',
        lastName: 'System',
        email: 'admin@shop.com',
        password: adminPassword,
        phoneNumber: '+84123456789',
        avatar: null,
        isActive: true,
        roleId: 1, // Admin role
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: userPassword,
        phoneNumber: '+84987654321',
        avatar: null,
        isActive: true,
        roleId: 3, // User role
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        password: userPassword,
        phoneNumber: '+84555666777',
        avatar: null,
        isActive: true,
        roleId: 2, // Manager role
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
```

### 3. Seeder với faker (cho data test lớn)
```javascript
// seeders/20250711000002-demo-users-bulk.js
'use strict';
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;
    const defaultPassword = await bcrypt.hash('123456', saltRounds);
    
    const users = [];
    
    // Tạo 100 user giả lập
    for (let i = 0; i < 100; i++) {
      users.push({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: defaultPassword,
        phoneNumber: faker.phone.number(),
        avatar: faker.image.avatar(),
        isActive: faker.datatype.boolean(),
        roleId: faker.helpers.arrayElement([2, 3]), // Manager hoặc User
        createdAt: faker.date.past(),
        updatedAt: new Date()
      });
    }

    // Insert theo batch để tránh timeout
    const batchSize = 50;
    for (let i = 0; i < users.length; i += batchSize) {
      const batch = users.slice(i, i + batchSize);
      await queryInterface.bulkInsert('users', batch, {});
    }
  },

  async down(queryInterface, Sequelize) {
    // Xóa tất cả user trừ admin (id = 1)
    await queryInterface.bulkDelete('users', {
      id: {
        [Sequelize.Op.gt]: 3 // Giữ lại 3 user đầu tiên
      }
    });
  }
};
```

### 4. Chạy seeder
```bash
# Chạy tất cả seeders
npx sequelize-cli db:seed:all

# Chạy seeder cụ thể
npx sequelize-cli db:seed --seed 20250711000000-demo-roles.js

# Rollback tất cả seeders
npx sequelize-cli db:seed:undo:all

# Rollback seeder cụ thể
npx sequelize-cli db:seed:undo --seed 20250711000000-demo-roles.js
```

---

## 💡 Best Practices

### 1. Naming Conventions
```javascript
// ✅ GOOD
// Table names: singular, lowercase
'users', 'roles', 'products', 'order_items'

// Column names: camelCase
firstName, lastName, createdAt, updatedAt, roleId

// Migration files: descriptive và có timestamp
20250711101407-create-users-table.js
20250711101408-add-index-users-email.js
20250711101409-modify-users-phone-column.js

// Model names: PascalCase
User, Role, Product, OrderItem
```

### 2. Migration Best Practices
```javascript
// ✅ GOOD: Luôn có rollback
module.exports = {
  async up(queryInterface, Sequelize) {
    // Thay đổi schema
  },
  async down(queryInterface, Sequelize) {
    // Rollback thay đổi
  }
};

// ✅ GOOD: Sử dụng transaction cho multiple operations
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    
    try {
      await queryInterface.createTable('users', {/*...*/}, { transaction });
      await queryInterface.addIndex('users', ['email'], { transaction });
      
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};

// ✅ GOOD: Validate data type và constraints
{
  email: {
    type: Sequelize.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      len: [5, 100]
    }
  }
}
```

### 3. Seeder Best Practices
```javascript
// ✅ GOOD: Sử dụng upsert để tránh duplicate
module.exports = {
  async up(queryInterface, Sequelize) {
    const roles = [/*...*/];
    
    for (const role of roles) {
      await queryInterface.upsert('roles', role, {
        returning: false,
        conflictFields: ['name'] // Unique field
      });
    }
  }
};

// ✅ GOOD: Environment-specific seeding
module.exports = {
  async up(queryInterface, Sequelize) {
    const env = process.env.NODE_ENV || 'development';
    
    if (env === 'production') {
      // Chỉ seed data thiết yếu
      await this.seedEssentialData(queryInterface);
    } else {
      // Seed full demo data
      await this.seedDemoData(queryInterface);
    }
  }
};
```

### 4. Model Best Practices
```javascript
// models/user.model.js
'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    // Instance methods
    async comparePassword(password) {
      return bcrypt.compare(password, this.password);
    }
    
    toJSON() {
      const values = { ...this.get() };
      delete values.password; // Không trả về password
      return values;
    }
    
    // Class methods
    static associate(models) {
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role'
      });
    }
  }
  
  User.init({
    // Định nghĩa fields
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'First name is required' },
        len: { args: [1, 50], msg: 'First name must be 1-50 characters' }
      }
    }
    // ... other fields
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      // Hash password trước khi save
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      }
    }
  });
  
  return User;
};
```

---

## 🔥 Advanced Patterns

### 1. Custom Migration Class
```javascript
// utils/BaseMigration.js
class BaseMigration {
  constructor(queryInterface, Sequelize) {
    this.queryInterface = queryInterface;
    this.Sequelize = Sequelize;
  }
  
  async createTableWithTimestamps(tableName, columns) {
    const defaultColumns = {
      id: {
        type: this.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      createdAt: {
        type: this.Sequelize.DATE,
        allowNull: false,
        defaultValue: this.Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: this.Sequelize.DATE,
        allowNull: false,
        defaultValue: this.Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    };
    
    return this.queryInterface.createTable(tableName, {
      ...defaultColumns,
      ...columns
    });
  }
}

// Sử dụng trong migration
const BaseMigration = require('../utils/BaseMigration');

module.exports = {
  async up(queryInterface, Sequelize) {
    const migration = new BaseMigration(queryInterface, Sequelize);
    
    await migration.createTableWithTimestamps('products', {
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      }
    });
  }
};
```

### 2. Conditional Migrations
```javascript
// migrations/20250711000000-conditional-migration.js
module.exports = {
  async up(queryInterface, Sequelize) {
    // Kiểm tra table có tồn tại không
    const tableExists = await queryInterface.showAllTables();
    
    if (!tableExists.includes('users')) {
      await queryInterface.createTable('users', {/*...*/});
    }
    
    // Kiểm tra column có tồn tại không
    const tableDescription = await queryInterface.describeTable('users');
    
    if (!tableDescription.avatar) {
      await queryInterface.addColumn('users', 'avatar', {
        type: Sequelize.TEXT,
        allowNull: true
      });
    }
  }
};
```

### 3. Data Migration Pattern
```javascript
// migrations/20250711000000-migrate-user-data.js
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Thêm column mới
    await queryInterface.addColumn('users', 'fullName', {
      type: Sequelize.STRING(100),
      allowNull: true
    });
    
    // 2. Migrate data
    await queryInterface.sequelize.query(`
      UPDATE users 
      SET fullName = CONCAT(firstName, ' ', lastName)
      WHERE fullName IS NULL
    `);
    
    // 3. Thay đổi constraint
    await queryInterface.changeColumn('users', 'fullName', {
      type: Sequelize.STRING(100),
      allowNull: false
    });
    
    // 4. Tạo index
    await queryInterface.addIndex('users', ['fullName']);
  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('users', ['fullName']);
    await queryInterface.removeColumn('users', 'fullName');
  }
};
```

---

## 🚀 Production Tips

### 1. Environment Setup
```bash
# .env.production
NODE_ENV=production
DB_HOST=your-prod-host
DB_NAME=your-prod-db
DB_USER=your-prod-user
DB_PASSWORD=your-secure-password
DB_SSL=true

# Migration trong production
NODE_ENV=production npx sequelize-cli db:migrate
NODE_ENV=production npx sequelize-cli db:migrate:status
```

### 2. Backup Before Migration
```bash
# Script backup trước khi migrate
#!/bin/bash
echo "Creating backup..."
mysqldump -h $DB_HOST -u $DB_USER -p$DB_PASSWORD $DB_NAME > backup_$(date +%Y%m%d_%H%M%S).sql

echo "Running migrations..."
npx sequelize-cli db:migrate

echo "Migration completed!"
```

### 3. Zero-downtime Migration
```javascript
// Thêm column mới (safe)
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'newField', {
      type: Sequelize.STRING,
      allowNull: true // Luôn nullable đầu tiên
    });
  }
};

// Populate data (safe)
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      UPDATE users 
      SET newField = 'default_value'
      WHERE newField IS NULL
    `);
  }
};

// Thay đổi constraint (cẩn thận)
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'newField', {
      type: Sequelize.STRING,
      allowNull: false // Bây giờ mới set NOT NULL
    });
  }
};
```

### 4. Monitoring & Logging
```javascript
// configs/database.js (production)
module.exports = {
  production: {
    // ... other config
    logging: (sql, timing) => {
      if (timing > 1000) { // Log slow queries
        console.warn(`Slow query (${timing}ms):`, sql);
      }
    },
    benchmark: true,
    pool: {
      max: 20,
      min: 5,
      acquire: 60000,
      idle: 10000
    }
  }
};
```

### 5. CI/CD Integration
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run migrations
        run: |
          npm run migrate:status
          npm run migrate:up
        env:
          NODE_ENV: production
          DB_HOST: ${{ secrets.DB_HOST }}
          DB_NAME: ${{ secrets.DB_NAME }}
          DB_USER: ${{ secrets.DB_USER }}
          DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
```

---

## 📚 Useful Commands Summary

```bash
# Project setup
npx sequelize-cli init
npx sequelize-cli db:create
npx sequelize-cli db:drop

# Migrations
npx sequelize-cli migration:generate --name migration-name
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:status

# Seeders
npx sequelize-cli seed:generate --name seeder-name
npx sequelize-cli db:seed:all
npx sequelize-cli db:seed:undo:all

# Models (nếu cần auto-generate)
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

---

## ⚠️ Common Pitfalls

1. **Không test migration rollback** - Luôn test cả up và down
2. **Quên backup** - Luôn backup trước khi migrate production
3. **Thay đổi migration đã chạy** - Tạo migration mới thay vì sửa cũ
4. **Không dùng transaction** - Wrap multiple operations trong transaction
5. **Hardcode environment values** - Dùng environment variables
6. **Ignore foreign key constraints** - Careful với thứ tự migrate/rollback
7. **Large data migration without batching** - Process large datasets in chunks

---

*Tài liệu này được tạo cho developers có kinh nghiệm. Nếu cần thêm thông tin chi tiết về topic nào, hãy tham khảo [Sequelize Documentation](https://sequelize.org/).*