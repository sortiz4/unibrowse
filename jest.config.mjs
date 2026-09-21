import { getJestProjectsAsync } from '@nx/jest';

export default async function() {
  return {
    projects: await getJestProjectsAsync(),
  };
}
