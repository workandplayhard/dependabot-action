import * as core from '@actions/core'
import * as github from '@actions/github'
import {getJobParameters} from './inputs'
import {ImageService} from './image-service'
import {Updater} from './updater'
import {APIClient} from './api-client'
import axios from 'axios'

export const UPDATER_IMAGE_NAME =
  'docker.pkg.github.com/dependabot/dependabot-updater:latest'

async function run(): Promise<void> {
  try {
    // Decode JobParameters:
    const params = getJobParameters(github.context)
    if (params === null) {
      return
    }
    core.setSecret(params.jobToken)
    core.setSecret(params.credentialsToken)

    const client = axios.create({baseURL: params.dependabotAPIURL})
    const apiClient = new APIClient(client, params)
    const updater = new Updater(UPDATER_IMAGE_NAME, apiClient)
    await ImageService.pullImage(UPDATER_IMAGE_NAME)

    await updater.runUpdater()
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
