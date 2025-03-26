const mongoose = require('mongoose');
const { Schema } = mongoose;

const propertySchema = new Schema({

  id: { type: Number, required: true },
  source: { type: String },
  source_id: { type: Number },
  source_dump: { type: Schema.Types.Mixed, default: null },
  source_link: { type: String },
  name: { type: String },
  parent_id: { type: Number, default: null },

  pricing: {
    currency: { type: String, required: true },
    duration: { type: String, required: true },
    max_price: { type: Number, required: true },
    min_price: { type: Number, required: true },
    available_price: { type: Number, required: true },
    refundable_token: { type: Number, required: true }
  },

  owner: {
    emails: [{ type: String }],
    phones: [{ type: String }]
  },

  meta: {
    facts: [
      {
        name: { type: String },
        count: { type: Number },
        value: { type: String }
      }
    ],
    types: [{ type: String }],

    payment: { type: Boolean },
    ranking: { type: Number },

    cro_tags: {
      is_student_choice: { type: Boolean, default: false },
      is_amber_exclusive: { type: Boolean, default: false },
      is_filling_fast_v2: { type: Boolean, default: false },
      is_immediate_move_in: { type: Boolean, default: false },
      is_property_of_the_day: { type: Boolean, default: false },
      area_unit: { type: String }
    },

    distances: [
      {
        place: { type: String },
        distance: { type: String }
      }
    ],

    unit_type: [{ type: String }],
    jotform_id: { type: String },
    meta_title: { type: String },
    unit_types: [{ type: String }],
    is_internal: { type: Boolean, default: false },
    is_partnered: { type: Boolean, default: true },
    payment_type: { type: String },

    price_trends: {
      trends: [
        {
          price: { type: Number },
          year_of_date: { type: Number },
          month_of_date: { type: Number }
        }
      ],

      avg_region_pricing: { type: Number},

      forecasting_percent_change: { type: Number },
      increase_price_percent_change: { type: Number },
      inventory_cost_percent_change: { type: Number },

    },
    bedroom_count: { type: Number },
    available_from: { type: String },
    bathroom_count: { type: Number },
    available_types: [{ type: String }],
    meta_description: { type: String },
    guarantor_required: { type: String, default: null },

    max_lease_duration: { type: Number },
    min_lease_duration: { type: Number },
    new_available_from: { type: String },
    total_videos_count: { type: Number, default: 0 },
    featured_image_path: { type: String },
    lease_duration_unit: { type: String },
    average_property_price: { type: Number, default: 0 },
    last_month_leads_count: { type: Number, default: 0 },
    booking_process_doc_url: { type: String },

    max_lease_duration_days: { type: Number },
    min_lease_duration_days: { type: Number },

    available_from_formatted: { type: String },
    available_from_timestamp: { type: Number },
    total_virtual_views_count: { type: Number, default: 0 },
    average_property_commission: { type: Number, default: 250 },
    max_available_lease_duration: { type: Number },
    min_available_lease_duration: { type: Number },
    max_available_lease_duration_days: { type: Number },
    min_available_lease_duration_days: { type: Number },

  },

  description: [
    {
      name: { type: String },
      value: { type: String },
      display_name: { type: String },
      short_text: { type: String },
      tag: { type: String },
      policy_applicable: { type: Boolean },
      payment_installment_options: [{ type: String }] // ["Monthly", "Quarterly", "Half Yearly", "Yearly"]
    }
  ],

  images: [
    {
      path: { type: String },
      type: { type: String },
      caption: { type: String },
      base_path: { type: String }
    }
  ],
  videos: [
    { type: String }
  ],
  location_coordinates: { type: String },

  location: {
    city_id: { type: Number },
    name: { type: String },
    route: {
      long_name: { type: String },
      short_name: { type: String }
    },
    state: {
      long_name: { type: String },
      short_name: { type: String }
    },
    country: {
      long_name: { type: String },
      short_name: { type: String }
    },
    primary: { type: String },
    district: {
      long_name: { type: String },
      short_name: { type: String }
    },
    locality: {
      long_name: { type: String },
      short_name: { type: String }
    },
    secondary: { type: String },
    postal_code: {
      long_name: { type: String },
      short_name: { type: String }
    },
    street_number: {
      long_name: { type: String },
      short_name: { type: String }
    },
    location_bounds: {
      northeast: {
        lat: { type: Number },
        lng: { type: Number }
      },
      southwest: {
        lat: { type: Number },
        lng: { type: Number }
      }
    },

  },
  location_place_id: { type: String },
  created_at: { type: String },
  updated_at: { type: String },
  canonical_name: { type: String },
  inventory_no: { type: String },
  status: { type: String },

  features: [
    {
      name: { type: String },
      type: { type: String },
      values: [
        {
          name: { type: String },
          type: { type: String }
        }
      ]
    },

  ],
  message: { type: String },
  offers: [{ type: String }],


  tags: [{ type: String }],

  stats: { type: Object },
  region_id: { type: Number },
  source_details: { type: Object },
  faqs: [
    {
      question: { type: String },
      answer: { type: String }
    }
  ],

  // Connect Details Object
  connect_details: { type: Object },
  virtual_views: [{ type: String }],
  provider_id: { type: Number },
  entities: [{ type: String }],
  message_1: { type: String },
  check_updated_at: { type: String },
  available: { type: Boolean, default: true },
  custom_form_id: { type: Schema.Types.Mixed, default: null },
  check_interval: { type: Number },
  next_check_due_date: { type: String },
  recent_bookings_count: { type: Number, default: 0 },
  is_local_non_commissionable: { type: Schema.Types.Mixed, default: null },
  payment_before_bookform: { type: Schema.Types.Mixed, default: null },


  // Separate Links Object
  links: { type: Object },
  weekly_price: { type: Number },


  highlights: [{ type: String }],

  inventory_featured_image_path: { type: String },
  images_with_featured: { type: Schema.Types.Mixed, default: null },
  offers_count: { type: Number, default: 1 }
});

// Add a method to populate city information when querying for properties
propertySchema.methods.populateCityData = async function() {
  // Populate city_id with data from the Accommodation-Cities collection
  await this.populate('location.city_id').execPopulate();
};


const Property = mongoose.model('Properties', propertySchema);

module.exports = Property;
