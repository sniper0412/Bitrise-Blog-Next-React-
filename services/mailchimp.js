const Mailchimp = require('mailchimp-api-v3');

const mailchimp = () => new Mailchimp(process.env.MAILCHIMP_API_TOKEN);

const getNewsletterListId = () => process.env.MAILCHIMP_LIST_ID;

const searchMember = (listId, query) =>
  mailchimp().get({
    path: '/search-members',
    query: {
      query,
      list_id: listId,
      fields: 'exact_matches.total_items,exact_matches.members'
    }
  });

const isMemberWithEmailAlreadySubscribed = async email => {
  const {
    exact_matches: { total_items, members }
  } = await searchMember(getNewsletterListId(), email);

  return total_items > 0 && members[0].status === 'subscribed';
};

const subscribeMember = async email => {
  try {
    await mailchimp().post({
      path: `/lists/${getNewsletterListId()}/members`,
      body: {
        email_address: email,
        status: 'subscribed'
      }
    });

    return true;
  } catch (error) {
    console.error(error.message);
    return false;
  }
};

module.exports = {
  isMemberWithEmailAlreadySubscribed,
  subscribeMember
};
