import CMS from 'netlify-cms-app';

import AboutPagePreview from './preview-templates/AboutPagePreview';
import BlogPostPreview from './preview-templates/BlogPostPreview';
import ProductPagePreview from './preview-templates/ProductPagePreview';
import IndexPagePreview from './preview-templates/IndexPagePreview';
import DjPagePreview from './preview-templates/DjPagePreview';
import EventPagePreview from './preview-templates/EventPagePreview';
import ShowPagePreview from './preview-templates/ShowPagePreview';
import DailyMixPagePreview from './preview-templates/DailyMixPagePreview'

CMS.registerPreviewTemplate('index', IndexPagePreview);
CMS.registerPreviewTemplate('about', AboutPagePreview);
CMS.registerPreviewTemplate('products', ProductPagePreview);
CMS.registerPreviewTemplate('blog', BlogPostPreview);
CMS.registerPreviewTemplate('djs', DjPagePreview);
CMS.registerPreviewTemplate('events', EventPagePreview);
CMS.registerPreviewTemplate('shows', ShowPagePreview);
CMS.registerPreviewTemplate('mixes', DailyMixPagePreview);


