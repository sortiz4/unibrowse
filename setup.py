#!/usr/bin/env python
import argparse
import os
from subprocess import run

BASE_PATH = os.path.abspath(os.path.dirname(__file__))
CLIENT_PATH = os.path.join(BASE_PATH, 'client')
CLIENT_ASSET_PATH = os.path.join(CLIENT_PATH, 'build')
CLIENT_SETUP_TASK = ['npm', 'install']
CLIENT_BUILD_TASK = ['npm', 'run', 'build']
SERVER_PATH = os.path.join(BASE_PATH, 'server')
SERVER_ASSET_PATH = os.path.join(SERVER_PATH, 'wwwroot')
SERVER_SETUP_TASK = ['dotnet', 'restore']


class Command:

    def __init__(self):
        # Construct the argument parser
        options = {
            'description': 'Setup and prepare the application for publishing.',
        }
        parser = argparse.ArgumentParser(**options)

        # Add the arguments to the parser
        arguments = [
            [
                [
                    '-s',
                    '--setup',
                ],
                {
                    'action': 'store_true',
                    'help': 'Download the client and server dependencies.',
                },
            ],
            [
                [
                    '-b',
                    '--build',
                ],
                {
                    'action': 'store_true',
                    'help': 'Compile and move the client assets to the server.',
                },
            ],
        ]
        for argument in arguments:
            parser.add_argument(*argument[0], **argument[1])

        # Parse the arguments from the system
        self.args = parser.parse_args()

    def handle(self):
        def run_in(callback, target):
            source = os.getcwd()
            os.chdir(target)
            callback()
            os.chdir(source)

        def setup():
            # Set up the client and server
            run_in(lambda: run(CLIENT_SETUP_TASK), CLIENT_PATH)
            run_in(lambda: run(SERVER_SETUP_TASK), SERVER_PATH)

        def build():
            # Compile the client
            run_in(lambda: run(CLIENT_BUILD_TASK), CLIENT_PATH)

            # Move the assets to the server
            os.rename(CLIENT_ASSET_PATH, SERVER_ASSET_PATH)

        if self.args.setup:
            setup()
        if self.args.build:
            build()


if __name__ == '__main__':
    Command().handle()
