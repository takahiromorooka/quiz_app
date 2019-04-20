Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'questions#index'
  resources :questions, only: [:index]

  namespace :admin do
    root to: 'questions#index'
    get 'questions/aggregate', to: 'questions#aggregate', as: :question_aggregate
  end

  namespace :api do
    namespace :v1 do
      resources :questions, only: [:show]
      put 'questions/:question_id', to: 'questions#answer', as: :question_answer
    end
  end
end
