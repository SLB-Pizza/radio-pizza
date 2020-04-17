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

============

# Tues Apr 07 Changes

Preview site updated, same link: https://halfmoon-rebuild-wip-2020.netlify.com/

## Radio Bar

- Make background color black to make schedule bar color
- Adjust sizing of mute/unmute, play/pause and chat buttons
- Make hover/active color of radio bar icons HMBK pink

## Schedule Bar

- Add HMBK pink colored border to bottom of bar to improve visual separation of content
- Remove in-bar 'schedule' button outline and color - now solid black

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
- Adjusting navbar background colors when touchscreen nav menu is open; testing nav menu bar color changes

## Upcoming

- Integrating 'Eurostile' as main site font - headings and titles
- Choosing complementary font for subtitles and text blocks
- More site color palette testing/expansion
  - We current have a three-color palette:
    - Halfmoon Pink - #f600ff
    - White
    - Black
  - Would like to add two more accent colors - five total

We'd love to hear your feedback!

---

@edrickchu2 @surfallah @richarddominguez10

## Switching from Mix to Live Broadcast

- I've programmed in a button for testing purposes only to show "live" layout vs "not live" layout
  - In Schedule Bar: "6PM" temporarily replaced with "not live"
    - Button only to show the status and will not be part of the final design - start time for the next show will be here
    - Click "not live" to toggle the way the Radio Bar will show there's a live broadcast - click again toggle it

**BORDER THICKNESS CONSISTENCY**

Yep that's a work-in-progress. I'll try switching everything over to HMBK pink for the next deploy to get a better idea which of all pink/all white/mixed should be the way we go,

> think the main thing that's tripping me up is all of the different border types (dotted vs. solid / 4px vs 2px / pink vs white)

I'm thinking that solid colors and solid borders will likely be the best way forward here -- we'll see.

> Could we try to simplify the types of borderlines we use to 2x max ? Maybe it can all be the same size, with the only difference being pink vs. white? LMK your thoughts here. Thanks!!

To keep sizing terms simple, there's two sizes in use currently, 1x and 2x. We can try making them all 2x, sure.

**COLOR PALETTES**

> Maybe we could explore some transparent pinks instead of the dark gray we often have for hovering bars right now (e.g. schedule bar)

Yep, agree, grey is already on the way out.

**> https://halfmoon-rebuild-wip-2020.netlify.com/bio**

On the live bio page, the mix hover color should be a purplish-color that's a shade of HMBK pink. Check it out -- it's not final; just a color option I put there to test.

**HOVERING MECHANICS**

> Is there a simpler way to incorporate a hover highlight mechanic (e.g. simply adding a glow to the border or border changing to pink vs. having it expand in space, etc.)

Yep, we agree here too -- a version of this was implemented in this deploy, on the bio page mixes.

I made the change because I realized that originally, the mixes images were not programmed to maintain a given aspect ratio. Once that change was made, it changed the way it transformed on hover, causing the layout to jitter as it did.

It's not your computer struggling with the page, it was the PAGE reacting to the new way the transforms happened.

**SCHEDULE TAB**

> Would be great if we could keep the schedule tab there, and people could just re-click it to minimize

I can make that happen, yeah.

**ART DIRECTION**

> Did y'all get a chance to look at the mood board images I dropped in?

I did! They're awesome and I'd love to get more to start using as page/section backdrops. I haven't had much success finding commercially-free high-res images like that, so please add more as you find them.

**IMPORTANT**: If you find an image we can use that requires attribution, _PLEASE_ include that info as well when posting the image to a trello card.

---

@edrickchu2 @surfallah @richarddominguez10

# Fri Apr 10 Changelog

## Major Changes

### Changing

### Addressing the Switch from Mix to Live Broadcast

- I've programmed in a button for testing purposes only to show "live" layout vs "not live" layout

#### Where is the button?

- "Next Show" in the Schedule Bar, if you click that, it'll toggle the TopNav layout to show what it'll look live when HMBK is live/broadcasting
- "Next Show" will change into "Listen Live"

#### Ok, so that's the live layout, how do you listen to the live stuff?

- When the site is launched, a user will be able to click/touch "Listen Live" to listen to the radio.co livestream.
- Clicking/touching "Listen Live" right now will toggle the TopNav layout back to "Not Live" layout.

#### Things to note

- This toggle is test-deploy only to show the difference between "live" layout and "not live"

### Fonts Added to the Site

**NB: The current deploy does not have all the font sized correctly creating layout issues.**

- Two fonts have been added to the site:
  - Titling/Headline Font: Eurostile Bold Extended No.2
  - Body Font: IBM Plex Sans >> [LINK TO FONT AND INFO](https://fonts.google.com/specimen/IBM+Plex+Sans)
- Eurostile -- the font you guys have been using on your market
- IBM Plex Sans -- FREE sans-serif font available served by Google Fonts that's weighty enough to stand enough against the width of Eurostile; tech looking retro sans-serif

Neither of these have been confirmed as final for the site, just current options.

With the knowledge of today's meeting in mind, I'll continue exploring font options to
