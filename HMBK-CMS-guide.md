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
| Mobile      | Desktop      |
|-------------|--------------|
| logo        | logo col     |
|             | Mute button  |
| RadioPlayer | Radio player |
| chat button | Chat button  |
|             | Time         |

ScheduleBar.js - NO CHANGE NEEDED
| Mobile | Desktop  |
|--------|----------|
| logo   | logo col |

HomeMixes -
| Mobile | Desktop |
|--------|---------|
|        |         |
|        |         |
|        |         |

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


# Apr 06 Changes

## Radio Bar

- Make background color black to make schedule bar color
- Adjust sizing of mute/unmute, play/pause and chat buttons
- Make hover/active color of radio bar icons Halfmoon pink

## `/bio`
- Make all mixes horizontal
- Adjust font sizes of mix details
- Change hover/active color to shade of Halfmoon pink

-
