import {Credential, JobDetails} from './api-client'

export type FetchedFiles = {
  base_commit_sha: string
  dependency_files: any[]
  base64_dependency_files: any[]
}

export type FileFetcherInput = {
  job: JobDetails
  credentials: Credential[]
}

export type DependencyFile = {
  name: string
  content: any
  directory: string
  type: string
  support_file: boolean
  content_encoding: string
  deleted: boolean
  operation: string
}

export type FileUpdaterInput = FetchedFiles & {
  job: JobDetails
}
