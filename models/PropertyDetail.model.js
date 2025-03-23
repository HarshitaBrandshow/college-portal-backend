const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertyDetailSchema = new Schema({
    id: { type: Number, required: true },
    source: { type: String },
    source_link: { type: String },
    name: { type: String, required: true },
    parent_id: { type: Schema.Types.ObjectId, ref: 'PropertyDetail', required: true },
    pricing: { 
        price: { type: Number, required: true }, 
        currency: { type: String }, 
        duration: { type: String } 
    },
    owner: { 
        emails: [{ type: String }], 
        phones: [{ type: String }] 
    },
    meta: {
    types: [{ type: String }],
    payment: { type: Boolean, required: true },
    unit_type: { type: String },
    jotform_id: { type: String, required: true },
    unit_types: [{ type: String }],
    is_internal: { type: Boolean },
    is_partnered: { type: Boolean },
    bedroom_count: { type: Number, required: true },
    bathroom_count: { type: Number, required: true },
    max_lease_duration: { type: Number, required: true },
    min_lease_duration: { type: Number, required: true },
    total_videos_count: { type: Number },
    lease_duration_unit: { type: String },
    max_lease_duration_days: { type: Number,},
    min_lease_duration_days: { type: Number, },
    total_virtual_views_count: { type: Number },
    },
    description: [
        { name: { type: String }, 
        value: { type: String, }, 
        display_name: { type: String } }
    ],
    images: [
        {
            path: { type: String, required: true },
            type: { type: String },
            caption: { type: String },
            featured: { type: Boolean },
            base_path: { type: String, required: true }
        }],
    videos: [
        {
            path: { type: String, required: true },
            type: { type: String },
            caption: { type: String },
            duration: { type: String, required: true },
            platform: { type: String },
            upload_date: { type: Date, required: true },
            thumbnail_url: { type: String, required: true }
        }
    ],
    location_coordinates: {
        lat: { type: Number },
        lng: { type: Number }
    },
    location: {
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
        postal_code: {
            long_name: { type: String },
            short_name: { type: String }
        },
        district: {
            long_name: { type: String },
            short_name: { type: String }
        },
        locality: {
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
        location_place_id: { type: String }
    },
    features: [
        {
            name: { type: String },
            type: { type: String },
            values: [{ type: String }]
        }],
    offers: [{ type: Schema.Types.Mixed }],
    tags: [{ type: String }],
    stats: { region_id: { type: Schema.Types.ObjectId } },
    region_id: { type: Number },
    source_details:{type:Object},
    faqs: [{ type: Schema.Types.Mixed }],
    connect_details: { type: Object},
    virtual_views: [{ type: Schema.Types.Mixed }],
    provider_id: { type: Schema.Types.ObjectId },
    entities: [{ type: Schema.Types.Mixed }],
    message_1: { type: String },
    check_updated_at: { type: Date },
    available: { type: Boolean },
    custom_form_id: { type: String },
    check_interval: { type: Number },
    next_check_due_date: { type: Date },
    recent_bookings_count: { type: Number },
    is_local_non_commissionable: { type: Boolean },
    payment_before_bookform: { type: Boolean },
    links: [{ type: Schema.Types.Mixed }],
    weekly_price: { type: Number } ,
    highlights: [{ type: Schema.Types.Mixed }],
    children_count: { type: Number },
    children: [{ type: Schema.Types.ObjectId, ref: 'PropertyDetail' }],
    active_children_count: { type: Number },
    inventory_featured_image_path: { type: String },
    images_with_featured: { type: Schema.Types.Mixed },
    active_children:[{ type: Schema.Types.ObjectId, ref: 'PropertyDetail' }],

    property_canonical_name : {type:String},

}, { timestamps: true });

const PropertyDetail = mongoose.model('Property_details', PropertyDetailSchema);

module.exports = PropertyDetail;
