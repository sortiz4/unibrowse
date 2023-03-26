#!/usr/bin/env python
import argparse
import csv
import json
import os
from io import StringIO
from urllib import request

BASE_PATH = os.path.dirname(os.path.abspath(__file__))
UNICODE_URL = 'https://unicode.org/Public/UNIDATA/UnicodeData.txt'
UNICODE_PATH = os.path.join(BASE_PATH, 'apps', 'client', 'src', 'unicode.json')


class Command:

    def __init__(self) -> None:
        # Construct the argument parser
        options = {
            'description': 'Downloads the required assets.',
        }
        parser = argparse.ArgumentParser(**options)

        # Add the arguments to the parser
        arguments = [
            [
                [
                    '-u',
                    '--unicode',
                ],
                {
                    'action': 'store_true',
                    'help': 'Downloads the latest Unicode data.',
                },
            ],
        ]
        for argument in arguments:
            parser.add_argument(*argument[0], **argument[1])

        # Parse the arguments from the system
        self.args = parser.parse_args()

    def handle(self) -> None:
        def unicode() -> None:
            # Download the Unicode data to memory
            with StringIO(request.urlopen(UNICODE_URL).read().decode('utf-8')) as file:
                rows = [row for row in csv.reader(file, delimiter=';')]

            # Write the Unicode data as JSON
            with open(UNICODE_PATH, mode='w') as file:
                file.write(json.dumps(rows))

        if self.args.unicode:
            unicode()


if __name__ == '__main__':
    Command().handle()
