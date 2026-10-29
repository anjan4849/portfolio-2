#!/usr/bin/env python3
"""
====================================================================
SERVE.PY — LOCAL DEVELOPMENT SERVER FOR ANJAN TRIPATHI'S PORTFOLIO
====================================================================
Newton School of Technology • Tech Student Portfolio
Usage:
    python3 serve.py
    python3 serve.py --port 8080
"""

import sys
import os
import socket
import argparse
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT_DEFAULT = 8000
HOST = "127.0.0.1"

# ANSI Colors
GREEN = "\033[92m"
CYAN = "\033[96m"
YELLOW = "\033[93m"
BOLD = "\033[1m"
RESET = "\033[0m"

class PortfolioHandler(SimpleHTTPRequestHandler):
    """Custom request handler with clean console logging and no-cache during development."""
    def end_headers(self):
        # Prevent aggressive browser caching during development
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, format, *args):
        # Clean terminal output for incoming requests
        sys.stdout.write(f"  {CYAN}→{RESET} {args[0]} {GREEN}[{args[1]}]{RESET}\n")

def find_available_port(start_port=8000, max_attempts=10):
    """Finds an open port starting from start_port."""
    for port in range(start_port, start_port + max_attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            if s.connect_ex((HOST, port)) != 0:
                return port
    return start_port

def print_banner(port):
    print(f"""
{GREEN}{BOLD}====================================================================
  🚀 ANJAN TRIPATHI — DEVELOPER PORTFOLIO DEV SERVER
  Newton School of Technology • Python & Modern CSS
===================================================================={RESET}
  {BOLD}Local URL:{RESET}    {CYAN}http://localhost:{port}{RESET}
  {BOLD}Network URL:{RESET}  {CYAN}http://{HOST}:{port}{RESET}
  {BOLD}Directory:{RESET}    {os.path.abspath(os.getcwd())}

  {YELLOW}Press Ctrl+C to stop the server.{RESET}
--------------------------------------------------------------------
    """)

def main():
    parser = argparse.ArgumentParser(description="Serve Anjan's Developer Portfolio locally.")
    parser.add_argument("--port", type=int, default=PORT_DEFAULT, help="Port to serve on (default: 8000)")
    parser.add_argument("--no-browser", action="store_true", help="Do not automatically open browser")
    args = parser.parse_args()

    # Change working directory to script location
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    port = find_available_port(args.port)

    try:
        server = HTTPServer((HOST, port), PortfolioHandler)
        print_banner(port)
        
        if not args.no_browser:
            try:
                webbrowser.open(f"http://localhost:{port}")
            except Exception:
                pass

        server.serve_forever()
    except KeyboardInterrupt:
        print(f"\n{YELLOW}[!] Shutting down server gracefully. Goodbye!{RESET}")
        sys.exit(0)
    except Exception as e:
        print(f"\n\033[91m[Error] Failed to start server: {e}{RESET}")
        sys.exit(1)

if __name__ == "__main__":
    main()
