import router from './router'
import store from './store'
import getPageTitle from '@/utils/get-page-title'


router.beforeEach(async (to, from, next) => {


  // set page title
  if (to.path) {
    document.title = getPageTitle(to.meta.title)
    next()
  }

})

