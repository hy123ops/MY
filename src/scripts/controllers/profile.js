import ProfileView from '../views/profile.art'
import myMainView from '../views/myMain.art'

class Profile{
    constructor(){
        this.render()
    }

  async  render(){
        let html = ProfileView({})
        $('header').html(html)

        let myMainViewhtml = myMainView({})
        $('main').html(myMainViewhtml)
    }
}

export default new Profile