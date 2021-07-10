#!/usr/bin/env python
import argparse
import os
from distutils import dir_util
from subprocess import run

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
CLIENT_DIR = os.path.join(BASE_DIR, 'client')
CLIENT_ASSET_DIR = os.path.join(CLIENT_DIR, 'build')
SERVER_DIR = os.path.join(BASE_DIR, 'server')
SERVER_ASSET_DIR = os.path.join(SERVER_DIR, 'wwwroot')
SETUP_HELP = 'Download the client and server dependencies.'
SETUP_CLIENT = ['npm', 'install']
SETUP_SERVER = ['dotnet', 'restore']
BUILD_HELP = 'Compile and move the client assets to the server.'
BUILD_CLIENT = ['npm', 'run', 'build']


class Command:
    help = 'Setup and prepare the application for publishing.'

    def __init__(self):
        parser = argparse.ArgumentParser(description=self.help)
        parser.add_argument('-s', '--setup', action='store_true', help=SETUP_HELP)
        parser.add_argument('-b', '--build', action='store_true', help=BUILD_HELP)
        self.args = parser.parse_args()

    def handle(self):
        if self.args.setup:
            self.setup()
        if self.args.build:
            self.build()

    @classmethod
    def setup(cls):
        os.chdir(CLIENT_DIR)
        run(SETUP_CLIENT, shell=True)
        os.chdir(SERVER_DIR)
        run(SETUP_SERVER, shell=True)

    @classmethod
    def build(cls):
        # Compile the client
        os.chdir(CLIENT_DIR)
        run(BUILD_CLIENT, shell=True)

        # Move the assets to the server
        dir_util.copy_tree(CLIENT_ASSET_DIR, SERVER_ASSET_DIR)
        dir_util.remove_tree(CLIENT_ASSET_DIR)


if __name__ == '__main__':
    Command().handle()
