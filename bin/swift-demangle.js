#!/usr/bin/env node

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createReadStream } from 'fs';
import { createInterface } from 'readline';

// Get the directory of this script to resolve the module path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import the demangle function
const { default: initialize } = await import(join(__dirname, '..', 'index.node.js'));

async function main() {
  const args = process.argv.slice(2);

  try {
    // Initialize the demangle function
    const demangle = await initialize();

    if (args.length === 0) {
      // Read from stdin if no arguments provided
      await processStdin(demangle);
    } else {
      // Process command line arguments
      for (const mangledName of args) {
        const demangled = demangle(mangledName);
        console.log(`${mangledName} ---> ${demangled}`);
      }
    }
  } catch (error) {
    console.error('Error initializing swift-demangle:', error.message);
    process.exit(1);
  }
}

async function processStdin(demangle) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  for await (const line of rl) {
    const trimmed = line.trim();
    if (trimmed) {
      // Split line by whitespace to handle multiple symbols per line
      const symbols = trimmed.split(/\s+/);
      for (const symbol of symbols) {
        if (symbol) {
          const demangled = demangle(symbol);
          console.log(`${symbol} ---> ${demangled}`);
        }
      }
    }
  }
}

// Handle process signals gracefully
process.on('SIGINT', () => {
  process.exit(0);
});

process.on('SIGTERM', () => {
  process.exit(0);
});

main().catch((error) => {
  console.error('Fatal error:', error.message);
  process.exit(1);
});
