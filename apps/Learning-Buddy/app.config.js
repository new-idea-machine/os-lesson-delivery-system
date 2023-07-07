import 'dotenv/config';
module.exports = {
  name: '24/7 learning buddy',
  version: '1.0.0',
  extra: {
    IP: process.env.IP,
    supabaseURL:process.env.SUPABASEURL,
    supabaseKEY_PUBLIC:process.env.SUPABASEKEY_PUBLIC,
    supabaseKEY_SECRET:process.env.SUPABASEKEY_SECRET
  },
};
