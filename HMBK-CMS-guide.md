# HMBK CMS Guide

[Link to CMS docs](netlifycms.org/)

## How CMS Previews Work

### config.yml

These are separated by collections, detailed as follows:

- name: string -- name of section
- label: string -- visible label for adding content
- folder: string -- path to cms template file
  - e.g. 'src/pages/blog leads to index.js'
- create: bool -- true enables new posts
- slug: str-obj -- how to create the unique url
  - e.g. '{{year}}-{{month}}-{{day}}-{{slug}}'
- fields -- list of objects
  - each obj contains:
    - {label: string,
      name: string,
      widget: 'hidden',
      default: string}

### Changes

- **TABLET ONLY changes:**
  - Mixes: still horizontally-scrollable list of 8 mixes
  - Events: now displays 3 static events - scroll removed; matches desktop layouts
  - Features: now displays 2 static features - scroll removed; matches desktop layouts

RadioBar.js - DONE
| Mobile | Desktop |
|-------------|--------------|
| logo | logo col |
| | Mute button |
| RadioPlayer | Radio player |
| chat button | Chat button |
| | Time |

ScheduleBar.js - NO CHANGE NEEDED
| Mobile | Desktop |
|--------|----------|
| logo | logo col |

HomeMixes -
| Mobile | Desktop |
|--------|---------|
| | |
| | |
| | |

29 Mar 2020

- Added hover effect to all home page content cards
- Added working nav links to different pages on the site
  - schedule
  - residents
  - sample bio page (RowdyRobo)

Hello all! Hope this week has treated you guys well. We've prepared a deploy with this week's work for you guys to check out:

https://halfmoon-rebuild-wip-2020.netlify.com/

That deploy link _should_ update to reflect integrated changes, whereas before it didn't - you should be able to bookmark this to see things going forward.

# Major Changes

- Player continues playing audio from page to page on the site
  - To see in action, try starting the default chillwave mix and then navigate to other pages
- The navigation links should work on desktop and touch devices
  - Social media icons now link to HMBK socials
  - (Touch Only) Icons have been reorganized to free space when navigation bar is open
- The schedule bar has been made fullwidth on touch devices to give elements more screen space
  - Similar treatment will be given to the radio bar
- On short laptop/desktop screens, the schedule dropdown close button should no longer be cut off
- On android devices, the address bar in Chrome is now HalfmoonBK pink (IMAGE)
- When a new audio source (mix) is selected, the player will autoplay selection even if player is currently not active
- Add test mixes to bio page; these should start through player

## Schedule Page

- Needs to be updated to reflect the current schedule dropdown/overlay solution - WIP

## Residents Page

- Now list of residents page; clicking/touching any RowdyRobo should take you to their bio page

## Bio Page

- Now features sample layout with artist name, detail, blurb, social links and relevant mixes section
  - The social media links below the resident blurb should link out to their appropriate platforms

## Known Issues

- We're aware that the images on the bio page aren't loading properly; if at all.
- On touch devices, longer mix titles cause the text to overflow into other sections of the site - this is being addressed with some work-in-progress marquee code.

We got a lot done this week!

# Tues Apr 07 Changes

## Radio Bar

- Make background color black to make schedule bar color
- Adjust sizing of mute/unmute, play/pause and chat buttons
- Make hover/active color of radio bar icons HMBK pink

## Schedule Bar

- Add HMBK pink colored border to bottom of bar to improve visual separation of content
- Remove in-bar 'schedule' button outline and color

## Navbar

- Add HMBK pink colored border to top of bar to improve visual separation of content
- Change nav link text color to pink white; HMBK pink on hover

## `/residents`

- Add functionality to switch between "This Season" and "Our Alumni" - just click the column you want to see
- Add selector column and resident container styling based of shades of HMBK pink

## `/bio`

- Make all mixes horizontal
- Adjust font sizes of mix details
- Make hover/active color of resident social icons to HMBK pink
- Change hover/active color of single mix to dark shade of HMBK pink

## In Progress

- Switching from a mix to the live broadcast; test button programmed, "live" layout and switch button styling in progress
- Adjusting navbar background colors when nav menu is open; testing nav menu bar color changes

--

## Switching from Mix to Live Broadcast

- I've programmed in a button for testing purposes only to show "live" layout vs "not live" layout
  - In Schedule Bar: "6PM" temporarily replaced with "not live"
    - Button only to show the status and will not be part of the final design - start time for the next show will be here
    - Click "not live" to toggle the way the Radio Bar will show there's a live broadcast - click again toggle it
