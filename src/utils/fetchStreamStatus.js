/**
 * Fetches the HMBK radio stream status.
 * Called by {@link ScheduleBar} to set initial TopNav status and to poll for radio live updates.
 * @category Utilities
 * @function fetchStreamStatus
 * @returns {String} One of "online" or "offline"
 */
export default async function fetchStreamStatus() {
  try {
    const streamResponse = await fetch(
      `https://public.radio.co/stations/s6f093248d/status`
    )
    const data = await streamResponse.json()
    return data.status
  } catch (error) {
    console.error('Error while fetching HMBK radio.co stream status.')
    console.error(error)
    return
  }
}
