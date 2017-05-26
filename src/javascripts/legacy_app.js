import BaseApp from 'base_app';

const App = {
  requests: {
    fetchAccountInfo: function (key) {
      return {
        url: `https://webhooks.aweber.com/zendesk-widget/lotus?${key}&email=${this.email}`,
        type: 'GET',
        dataType: 'json',
        secure: true
      }
    }
  },

  requestAccountInfo: function() {
    this.zafClient.get(['ticket.requester.email'])
      .then(data => {
        this.email = data['ticket.requester.email'];
        this.zafClient.metadata()
          .then(({ settings }) => {
            const { app_key } = settings;
            if(!app_key) {
              return this.switchTo('no_key', {});
            }
            this.ajax('fetchAccountInfo', app_key);
          });
      }).catch(function() {this.switchTo('failed', {});});
  },

  renderAccountInfo: function({ subscribed, unconfirmed, unsubscribed, status }) {

    if(status !== 'success') {
      return this.switchTo('failed', {});
    }

    this.anysubs = false;
    if(!subscribed.length && !unconfirmed.length && !unsubscribed.length) {
      return this.switchTo('not_found', { email: this.email });
    }

    this.anysubs = (!subscribed.length && !unconfirmed.length) ? false : true;
    this.subscribed = subscribed;
    this.unconfirmed = unconfirmed;
    this.unsubscribed = unsubscribed;

    this.switchTo('info', {
      anysubs: this.anysubs,
      email: this.email,
      subscribed: this.subscribed,
      unconfirmed: this.unconfirmed,
      unsubscribed: this.unsubscribed
    });

    this.submenus = this.$('.aweber_submenu');
    this.submenus.hide();
  },

  events: {
    'app.activated': 'requestAccountInfo',

    'fetchAccountInfo.done': function(data = {}) {
      this.renderAccountInfo(data);
    },

    'fetchAccountInfo.fail': function() {
      this.switchTo('failed', {});
    },

    'ticket.requester.email.changed': 'requestAccountInfo',

    'click .aweber_section': function(event) {
      event.preventDefault();
      const target = event.target || event.srcElement;
      this.$(`#aweber_submenu_${target.id.split('_')[2]}`).show();
      this.$('.aweber_app').hide();
    },

    'click .aweber_back_to_lists': function() {
      this.submenus.hide();
      this.$('.aweber_app').show();
    },

    'click .update-aweber': function(event) {
      event.preventDefault();
      const target = event.target || event.srcElement;
      this.updateTicketInfo('customer', target.text);
    }
  }
}

export default BaseApp.extend(App);
