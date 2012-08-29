(function() {
  return {

      defaultState: 'loading',

      requests: {
          fetchAccountInfo: function(key) {
              return {
                  url: 'https://webhooks.aweber.com/zendesk-widget/lotus?'+key+'&email='+this.email,
                  dataType: 'json'
              };
          }
      },

      events: {
          'app.activated': 'requestAccountInfo',

          'fetchAccountInfo.done': function(data) {
              this.renderAccountInfo((data || {}));
          },

          'fetchAccountInfo.fail': function(data) {
              this.switchTo('failed', {});
          },

          'ticket.requester.email.changed': 'requestAccountInfo',

          'click .aweber_section': function(event) {
            event.preventDefault();
            var target = event.target || event.srcElement;
            this.$('#aweber_submenu_'+target.id.split('_')[2]).show();
            this.$('.aweber_app').hide();
            },

          'click .aweber_back_to_lists': function() {
              this.submenus.hide();
              this.$('.aweber_app').show();
          },

          'click .update-aweber': function(event) {
              event.preventDefault();
              var target = event.target || event.srcElement;
              this.updateTicketInfo('customer', target.text);
          }
      },

      renderAccountInfo: function(accountInfo) {
          this.anysubs = false;
          if(accountInfo.subscribed.length === 0 && accountInfo.unconfirmed.length === 0 && accountInfo.unsubscribed.length === 0) {
              this.switchTo('not_found', { email: this.email });
              return;
          }
          if(accountInfo.subscribed.length === 0 && accountInfo.unconfirmed.length === 0) {
              this.anysubs = false;
          } else {
              this.anysubs = true;
          }
          this.subscribed = accountInfo.subscribed;
          this.unconfirmed = accountInfo.unconfirmed;
          this.unsubscribed = accountInfo.unsubscribed;
          if(accountInfo.status != 'success') {
              this.switchTo('failed', {});
              return;
          }
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

      requestAccountInfo: function() {
          this.email = this.ticket().requester().email();
          var key = this.settings.app_key;
          if(key.length === 0) {
              this.switchTo('no_key', {});
              return;
          }
          this.ajax('fetchAccountInfo', key);
      }
  };

}());
