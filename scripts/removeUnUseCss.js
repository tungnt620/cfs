// By default penthouse opens urls called in parallel in different tabs
// in the same browser, for performance reasons.
// If you need to run many pages however your machine will at some point
// (~ 10 pages) start running out of resources (causing crashes, errors and/or slowdown).
//
// Hence, better to setup a queue -
// this is just a simple example!

const penthouse = require('penthouse')

// populate with as many urls as you want,
// only X will be executed in parallel;
// configured at the bottom
const urls = [
  'https://confession.vn',
  'https://confession.vn/new',
  'https://confession.vn/all-categories',
  'https://confession.vn/9321-e-hoc-hpu2-ang-thich-1-a-bk-nam-3-gioi-thieu-oi-chut-thi-e-cung-c',
  'https://confession.vn/category/confessionsqnu',
]
const penthouseOptions = {
  css: 'dist/apps/client/.next/static/css/55c52f2ed2ac208cee0c.css'
}

// recursively generates critical css for one url at the time,
// until all urls have been handled
function startNewJob () {
  const url = urls.pop() // NOTE: mutates urls array
  if (!url) {
    // no more new jobs to process (might still be jobs currently in process)
    return Promise.resolve()
  }
  return penthouse({
    url,
    ...penthouseOptions
  })
    .then(criticalCss => {
      // do something with your criticalCSS here!
      // Then call to see if there are more jobs to process
      return startNewJob()
    })
}

// how many jobs do we want to handle in paralell?
// Below, 5:
Promise.all([
  startNewJob(),
  startNewJob(),
  startNewJob(),
  startNewJob(),
  startNewJob()
])
  .then((result) => {
    console.log(result)
    console.log('all done!')
  })


// const penthouse = require('penthouse')
// const fs = require('fs')
//
// penthouse({
//   url: 'https://confession.vn',
//   css: 'dist/apps/client/.next/static/css/55c52f2ed2ac208cee0c.css'
// })
//   .then(criticalCss => {
//     // use the critical css
//     fs.writeFileSync('outfile.css', criticalCss)
//   })
