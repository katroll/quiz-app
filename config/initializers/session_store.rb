

MyApp::Application.config.session_store( 
  :cookie_store, 
  key: '_my_app_session',
  secure: Rails.env.production?
)