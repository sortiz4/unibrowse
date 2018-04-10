#!/usr/bin/env python
import argparse
import os
import sys
from subprocess import PIPE
from subprocess import run

BASE_DIR = os.path.dirname(__file__)
NODE_DIR = os.path.join(BASE_DIR, 'node_modules')
SRC_DIR = os.path.join(BASE_DIR, 'public', 'assets')
OUT_DIR = os.path.join(BASE_DIR, 'public', 'static')


class Sass:
    HELP = 'Compile, bundle, and compress Sass.'
    SRC = os.path.join(SRC_DIR, 'app.scss')
    OUT = os.path.join(OUT_DIR, 'app.min.css')
    CMD = 'sass'
    ARGS = ['--include-path', 'node_modules']


class CleanCss:
    CMD = 'cleancss'
    ARGS = ['-O2', '-O1', 'specialComments:0']


class Command:
    help = 'Collects and builds static assets for this application.'

    def __init__(self):
        parser = argparse.ArgumentParser(description=Command.help)
        parser.add_argument('-s', '--sass', action='store_true', help=Sass.HELP)
        self.args = parser.parse_args()

    def handle(self):
        if self.args.sass:
            Command.sass()

    @staticmethod
    def npm(args, **kwargs):
        args = ['npm', 'run', '-s', args[0], '--', *args[1:]]
        return run(args, shell=True, stdout=PIPE, **kwargs)

    @staticmethod
    def sass():
        if not os.path.exists(os.path.dirname(Sass.OUT)):
            os.makedirs(os.path.dirname(Sass.OUT))
        process = Command.npm([Sass.CMD, Sass.SRC, *Sass.ARGS])
        # process = Command.npm([CleanCss.CMD, *CleanCss.ARGS], input=process.stdout)
        buffer = process.stdout.decode(sys.stdout.encoding)
        open(Sass.OUT, 'w+').write(buffer)


if __name__ == '__main__':
    Command().handle()
