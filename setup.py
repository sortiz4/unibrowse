#!/usr/bin/env python
import argparse
import os
from distutils import dir_util
from subprocess import run

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
CLIENT_BASE_DIR = os.path.join(BASE_DIR, 'client')
CLIENT_ASSET_DIR = os.path.join(CLIENT_BASE_DIR, 'build')
SERVER_BASE_DIR = os.path.join(BASE_DIR, 'server')
SERVER_ASSET_DIR = os.path.join(SERVER_BASE_DIR, 'wwwroot')
SETUP_CLIENT = ['npm', 'install']
SETUP_SERVER = ['dotnet', 'restore']
BUILD_CLIENT = ['npm', 'run', 'build']


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
        def setup():
            os.chdir(CLIENT_BASE_DIR)
            run(SETUP_CLIENT)
            os.chdir(SERVER_BASE_DIR)
            run(SETUP_SERVER)

        def build():
            # Compile the client
            os.chdir(CLIENT_BASE_DIR)
            run(BUILD_CLIENT)

            # Move the assets to the server
            dir_util.copy_tree(CLIENT_ASSET_DIR, SERVER_ASSET_DIR)
            dir_util.remove_tree(CLIENT_ASSET_DIR)

        if self.args.setup:
            setup()
        if self.args.build:
            build()


if __name__ == '__main__':
    Command().handle()
