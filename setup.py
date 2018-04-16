#!/usr/bin/env python
import argparse
import os
from distutils import dir_util
from frontend import manage
from subprocess import run

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
BACK_DIR = os.path.join(BASE_DIR, 'backend')
BACK_ASSET_DIR = os.path.join(BACK_DIR, 'wwwroot', 'static')
FRONT_DIR = os.path.join(BASE_DIR, 'frontend')
FRONT_BUILD_DIR = os.path.join(FRONT_DIR, 'build')
FRONT_ASSET_DIR = os.path.join(FRONT_BUILD_DIR, 'static')


class Setup:
    HELP = 'Download backend and frontend dependencies.'
    BACK = ['dotnet', 'restore']
    FRONT = ['npm', 'install']


class Build:
    HELP = 'Compile and move frontend assets to the backend.'
    FRONT = ['npm', 'run', 'build']


class Command:
    help = 'Setup and prepare the application for publishing.'

    def __init__(self):
        parser = argparse.ArgumentParser(description=Command.help)
        parser.add_argument('-s', '--setup', action='store_true', help=Setup.HELP)
        parser.add_argument('-b', '--build', action='store_true', help=Build.HELP)
        self.args = parser.parse_args()

    def handle(self):
        if self.args.setup:
            Command.setup()
        if self.args.build:
            Command.build()

    @staticmethod
    def setup():
        os.chdir(BACK_DIR)
        run(Setup.BACK, shell=True)
        os.chdir(FRONT_DIR)
        run(Setup.FRONT, shell=True)

    @staticmethod
    def build():
        # Compile the frontend
        os.chdir(FRONT_DIR)
        manage.Command.sass()
        run(Build.FRONT, shell=True)
        os.chdir(BASE_DIR)

        # Organize the assets
        JAVASCRIPT_DIR = os.path.join(FRONT_ASSET_DIR, 'js')
        for root, dirs, files in os.walk(JAVASCRIPT_DIR):
            for name in files:
                if name.endswith('.js'):
                    old_path = os.path.join(JAVASCRIPT_DIR, name)
                    new_path = os.path.join(FRONT_ASSET_DIR, 'app.min.js')
                    os.rename(old_path, new_path)
                    break
            break
        
        # Move the assets to the backend
        dir_util.remove_tree(JAVASCRIPT_DIR)
        dir_util.copy_tree(FRONT_ASSET_DIR, BACK_ASSET_DIR)
        dir_util.remove_tree(FRONT_BUILD_DIR)
    

if __name__ == '__main__':
    Command().handle()
