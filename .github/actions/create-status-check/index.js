const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const [gitHubRepoOwner, gitHubRepoName] = process.env.GITHUB_REPOSITORY.split('/');
    const gitHubSha = process.env.GITHUB_SHA;
    const gitHubToken = core.getInput('github_token');

    const octokit = github.getOctokit(gitHubToken);

    octokit.checks.create({
      owner: gitHubRepoOwner,
      repo: gitHubRepoName,
      name: core.getInput('name'),
      head_sha: gitHubSha,
      status: 'completed',
      conclusion: core.getInput('conclusion'),
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
