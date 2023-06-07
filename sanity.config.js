/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...index]]/page.jsx` route
 */

import {visionTool} from '@sanity/vision';
import {defineConfig} from 'sanity';
import {deskTool} from 'sanity/desk';

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './sanity/env';
import {schema} from './sanity/schema';
import Navbar from './app/studio/components/Navbar';

export default defineConfig({
  name:'Harsh_Porfolio_Studio',
  title: "Harsh's Studio",
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schema' folder
  schema,
  studio: {
    components: {
      navbar: Navbar,
    },
  },
  plugins: [
    deskTool(),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
