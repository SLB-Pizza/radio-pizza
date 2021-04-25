import { formatDateTime } from './index'

export default function processDeployInfo(singleDeployObj) {
  const {
    site_id,
    title,
    created_at,
    published_at,
    state,
    deploy_time,
  } = singleDeployObj

  const publishTime = formatDateTime(published_at, 'short-form-date-time')
  const startedTime = formatDateTime(created_at, 'short-form-date-time')

  const deployMinutes = Math.floor(deploy_time / 60)
  const deploySeconds = deploy_time % 60
  let deployTime = ''

  if (deployMinutes) deployTime += `${deployMinutes}m`
  if (deploySeconds) deployTime += `${deploySeconds}s`

  return {
    site_id,
    title,
    state,
    startedTime,
    publishTime,
    deployTime,
  }
}
