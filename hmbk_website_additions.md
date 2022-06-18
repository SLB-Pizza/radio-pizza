# HMBK Website Addition requests

All timelines are tentative estimates; they are subject to change based on feasability/research.

## Achievable

1. Continuous load when loading stuff and remove the more button

- Look into infinite scroll
- 1 to 2 weeks work

2. Add react spring to the slide down schedule (something we never got to do)

- 1 to 3 days work

3. Letter filtering for residents (A-z 123) on residents page.

- 2 to 3 weeks
- Large estimate due to HOW the site receives resident data (or mixes/events, etc for that matter), from Prismic
- Possible that site would need to be migrated to a new Gatsby version AND use a new Gatsby/Prismic connection interface library as it might be exceedingly difficult/too time consuming through current means

4. Make top bar slightly thinner

- 1 to 3 days work
- Would need to ensure size parity across all current device sizes

5. Relocate world clocks to both schedules; dropdown and page

- 1 to 2 weeks

6. Be able to click dj’s name in media cards on home page which reroutes you to the resident's personal page on site.

- 2 days work

6. Remove all mix link icons from cards

- 1 day work

7. Refactor Top and Navigation bar into one complete links bar
8. Extract Radio Player from bar to play only on selected mixes; hide for live mix

9. Create pop out winder for chat room

- 3 to 4 weeks work; if request is implying the building of a brand new chat client for the site
  - Would require additional financial prep to pay for the databases needed to host the chat messages to beam out to all available users
- If not, then trying to create an on-page, collapsable chat Chatango window would be very difficult; need to examine feasibility

6. Do not “pause” stream when pause button is hit simply mute it but keep it in real-time. We want the stream to always remain in real time.

- 2 to 3 days work; might be hampered by pre-existing iOS pause/play bug
- Would need 2 to 3 days pre-testing to determine if feasible
- Possible that stream ALREADY jumps to current position in live-stream

7. On the carousel have a category “interview, event, radio, etc”

- 1 to 2 days work

8. Be able to set names on marquee to update automatically by time

- 1 to 3 weeks worth; needs more research
- Long desired capability; Google calendar connection discussed in the past
- If memory is correct, 99% likely require a G-Suite paid HMBK account to access Calendar API functionality

9. Be able to update the schedule page and dropdown automatically using a calendar

- 1 to 3 weeks worth; needs more research
- Long desired capability; Google calendar connection discussed in the past
- If memory is correct, 99% likely require a G-Suite paid HMBK account to access Calendar API functionality

10. Be able to use left and right arrows to go thru the carousel on the keyboard

- 1 to 3 weeks work
- Large estimate range due to possible need to ditch current carousel and use different carousel library/build something bespoke
  - Possible carousel section refactor needed
- Needs 1 week research

11. Move editorial ahead of the events section (NOT DOING)

- 1 day work
- Confirm new order top to bottom:
  - Carousel
  - Sound Selects
  - Editorial
  - Events

12. Seek bar to go thru mixes skip forward and backward

- 1 to 2 weeks work
- Needs initial research done IF Soundcloud migration is complete

13. Genre filter selection on the radio page. After we click radio it brings us a list of genres to scroll thru alongside the most updated mixes.

- 1 to 2 weeks work

14. Add search option.

- 1 to 2 weeks work

15. Switch out bottom nav Mixcloud for SoundCloud icon

- 1 day work.

16. Add brand new "Videos" section to Prismic to display to site
17. Add brand new "Gallery" section to Prismic to display to site
18. Create video helpers for Prismic site functionality

## Previously discussed suggestions

1. Add photo credits to editorial bylines

- 1 to 2 days work

2. Add author/photog social handles to editorial article byline sections

- 1 to 2 days work

3. Add author/photog footer bio section detailing personal bits about writer/contributors

- 2 to 4 days work

4. Create mix page template detailing the individual tracks on a radio mix

- 1 to 2 weeks work

5. Add social media sharables (editorial, event, mixes)

- 1 to 2 weeks work (research needed)

6. Ability to add to calendar directly from an event page
   1. Google Calendar
   2. iCal

## Needs clarification/more situation info

1. Filter residents in alphabetical order on the back end.

- Prismic side? if so, then I can do nothing there, but I can create a page on the private admin landing

2. Sometimes on prismic search engine does not work and you have to sign out and sign back in to get it to function how can we fix that bug?

- If it's on the prismic site itself, then I have no control this issue, since Prismic is not something I developed.

## First Project Wave - 1 week

- Add some animations to the slide down schedule
  - Discussed the use of `react-spring` a long time ago; check for other options as well
-
