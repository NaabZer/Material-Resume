const initialState = {
  text:{
    initial:{
      sv: "Exempeltext",
      en: "Example Text",
    },
    1:{
      sv: "Arbetserfarenhet",
      en: "Work experience",
    },
  },
  work:{
    initial:{
      sv:{
        title: "Titel",
        location: "Arbetsplats",
        dateStart: "Mar 2020",
        dateEnd: "Aug 2020"
      },
      en:{
        title: "Title",
        location: "Location",
        dateStart: "Mar 2020",
        dateEnd: "Aug 2020"
      }

    },
    1: {
      sv:{
        title: "Webbutvecklare",
        location: "Linköpings universitet",
        dateStart: "Apr 2020",
        dateEnd: "Jun 2020"
      },
      en:{
        title: "Web developer",
        location: "Linköpings University",
        dateStart: "Apr 2020",
        dateEnd: "Jun 2020"
      }
    },
    2: {
      sv:{
        title: "Datavetare",
        location: "Coolt företag",
        dateStart: "Apr 2020",
        dateEnd: "Jun 2020"
      },
      en:{
        title: "Data scientist",
        location: "Cool company",
        dateStart: "Apr 2020",
        dateEnd: "Jun 2020"
      }
    }
  }
}

export function entries(state = initialState, action){
  switch(action.type){
    default:
      return state
  }
}
