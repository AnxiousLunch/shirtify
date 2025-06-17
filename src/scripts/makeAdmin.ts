import { makeUserAdminByEmail } from '../firebase/adminUtils';

const makeAdmin = async () => {
  const email = 'omershamsi911@gmail.com';
  const success = await makeUserAdminByEmail(email);
  
  if (success) {
    console.log(`Successfully made ${email} an admin!`);
  } else {
    console.log(`Failed to make ${email} an admin. Please check if the user exists.`);
  }
};

makeAdmin(); 