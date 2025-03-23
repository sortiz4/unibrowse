import { getJestProjectsAsync } from '@nx/jest';
import { Config } from 'jest';

export default async function(): Promise<Config> {
  return {
    projects: await getJestProjectsAsync(),
  };
}
