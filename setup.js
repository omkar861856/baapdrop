#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\x1b[36m%s\x1b[0m', '🚀 Welcome to BaapDrop Setup!');
console.log('This script will help you set up your local development environment.\n');

// Check dependencies
console.log('\x1b[33m%s\x1b[0m', '📋 Checking dependencies...');
try {
  const nodeVersion = execSync('node --version').toString().trim();
  console.log(`✅ Node.js: ${nodeVersion}`);

  try {
    const npmVersion = execSync('npm --version').toString().trim();
    console.log(`✅ npm: ${npmVersion}`);
  } catch (error) {
    console.error('❌ npm is not installed. Please install it and try again.');
    process.exit(1);
  }

  try {
    execSync('psql --version', { stdio: 'ignore' });
    console.log('✅ PostgreSQL is installed');
  } catch (error) {
    console.warn('⚠️ PostgreSQL command-line tools not found. You may need to install PostgreSQL or add it to your PATH.');
  }
} catch (error) {
  console.error('❌ Node.js is not installed. Please install it and try again.');
  process.exit(1);
}

// Setup environment file
console.log('\n\x1b[33m%s\x1b[0m', '📝 Setting up environment variables...');
if (!fs.existsSync('.env')) {
  try {
    fs.copyFileSync('.env.example', '.env');
    console.log('✅ Created .env file from example');
  } catch (error) {
    console.error('❌ Failed to create .env file:', error.message);
  }
} else {
  console.log('ℹ️ .env file already exists, skipping');
}

// Install dependencies
console.log('\n\x1b[33m%s\x1b[0m', '📦 Installing dependencies...');
try {
  console.log('This may take a while...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install dependencies', error.message);
  process.exit(1);
}

// Setup database
console.log('\n\x1b[33m%s\x1b[0m', '🛢️ Setting up database...');
rl.question('Would you like to setup the database now? (Y/n): ', (answer) => {
  if (answer.toLowerCase() !== 'n') {
    console.log('This script will create a new PostgreSQL database for the application.');
    
    rl.question('Database name (default: dropshipping): ', (dbName) => {
      const database = dbName || 'dropshipping';
      
      rl.question('PostgreSQL username (default: postgres): ', (username) => {
        const user = username || 'postgres';
        
        rl.question('PostgreSQL password: ', (password) => {
          const dbPassword = password;
          
          rl.question('PostgreSQL host (default: localhost): ', (host) => {
            const dbHost = host || 'localhost';
            
            rl.question('PostgreSQL port (default: 5432): ', (port) => {
              const dbPort = port || '5432';
              
              // Update .env file with database settings
              try {
                let envContent = fs.readFileSync('.env', 'utf8');
                envContent = envContent
                  .replace(/DATABASE_URL=.*/, `DATABASE_URL=postgresql://${user}:${dbPassword}@${dbHost}:${dbPort}/${database}`)
                  .replace(/PGUSER=.*/, `PGUSER=${user}`)
                  .replace(/PGPASSWORD=.*/, `PGPASSWORD=${dbPassword}`)
                  .replace(/PGDATABASE=.*/, `PGDATABASE=${database}`)
                  .replace(/PGHOST=.*/, `PGHOST=${dbHost}`)
                  .replace(/PGPORT=.*/, `PGPORT=${dbPort}`);
                
                fs.writeFileSync('.env', envContent);
                console.log('✅ Updated .env file with database settings');
                
                console.log('Running database migrations...');
                try {
                  execSync('npm run db:push', { stdio: 'inherit' });
                  console.log('✅ Database migrations completed successfully');
                } catch (error) {
                  console.error('❌ Failed to run database migrations', error.message);
                }
              } catch (error) {
                console.error('❌ Failed to update .env file:', error.message);
              }
              
              finishSetup();
            });
          });
        });
      });
    });
  } else {
    console.log('Skipping database setup. You can configure it manually later.');
    finishSetup();
  }
});

function finishSetup() {
  console.log('\n\x1b[32m%s\x1b[0m', '🎉 Setup completed successfully!');
  console.log('\nTo start the development server, run:');
  console.log('\x1b[36m%s\x1b[0m', '  npm run dev');
  console.log('\nTo learn more about the project, check out the README.md file.');
  rl.close();
}

rl.on('close', () => {
  console.log('\nThank you for installing BaapDrop! 🚀');
  process.exit(0);
});