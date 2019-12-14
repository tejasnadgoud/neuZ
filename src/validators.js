const validator = {
    firstName: {
      rules: [
        {
          test: /^[A-Z][a-z,A-Z]+$/,
          message: 'Invalid first name',
        },
        // {
        //   test: (value) => {
        //     return value.length > 0;
        //   },
        //   message: 'First Name cannot be blank',
        // },
      ],
      errors: [],
      valid: false,
      state: '',
    },

    lastName: {
        rules: [
          {
            test: /^[A-Z][a-z,A-Z]+$/,
            message: 'Invalid last name',
          },
        //   {
        //     test: (value) => {
        //       return value.length > 0;
        //     },
        //     message: 'Last Name cannot be blank',
        //   },
        ],
        errors: [],
        valid: false,
        state: '',
      },  
      
      emailId: {
        rules: [
          {
            test: /^[A-Za-z0-9_\.-]+@[A-za-z0-9-]+\.[A-Za-z\.]{2,7}$/,
            message: 'Invalid email',
          },
        //   {
        //     test: (value) => {
        //       return value.length > 0;
        //     },
        //     message: 'email cannot be blank',
        //   },
        ],
        errors: [],
        valid: false,
        state: '',
      },   
      
      phoneNumber: {
        rules: [
          {
            test: /^[2-9][0-9]{2}[2-9][0-9]{6}$/,
            message: 'Invalid phone number',
          },
        //   {
        //     test: (value) => {
        //       return value.length > 0;
        //     },
        //     message: 'phone number cannot be blank',
        //   },
        ],
        errors: [],
        valid: false,
        state: '',
      },
      
      zipCode: {
        rules: [
          {
            test: /^[0-9]{5}$/,
            message: 'Invalid zip code',
          },
        //   {
        //     test: (value) => {
        //       return value.length > 0;
        //     },
        //     message: 'Invalid zip code',
        //   },
        ],
        errors: [],
        valid: false,
        state: '',
      },

    //   source: {
    //     rules: [
    //         {
    //           test: (value) => {
    //             return value.length > 0;
    //           },
    //           message: 'comments cannot be blank',
    //         },
    //       ],
    //       errors: [],
    //       valid: false,
    //       state: '', 
    //   },

      comments: {
        rules: [
          {
            test: (value) => {
              return value.length > 0;
            },
            message: 'comments cannot be blank',
          },
        ],
        errors: [],
        valid: false,
        state: '',
      },


  };
  
  export default validator;