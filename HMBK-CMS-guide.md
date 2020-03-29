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
