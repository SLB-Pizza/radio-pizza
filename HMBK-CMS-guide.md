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
