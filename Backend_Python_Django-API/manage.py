#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import environ

# Initialize environment variables
env = environ.Env()
environ.Env.read_env(os.path.join(os.path.dirname(__file__), ".env"))


def main():
    """Run administrative tasks."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "movierater.settings")

    # Get IP and port from the environment variables
    ip = env("DJANGO_RUNSERVER_IP", default="0.0.0.0")
    port = env("DJANGO_RUNSERVER_PORT", default="8000")

    # Add runserver command with IP and port
    if len(sys.argv) == 1:
        sys.argv.append("runserver")
        sys.argv.append(f"{ip}:{port}")

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
