export function generateServiceSchema(service, businessName, websiteUrl, logoUrl, contactPhoneNumber) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title, 
    "name": `${businessName} - ${service.title}`, 
    "description": service.description, 
    "provider": {
      "@type": "LocalBusiness",
      "name": businessName,
      "url": websiteUrl,
      "logo": logoUrl,
      "telephone": contactPhoneNumber,
      "@id": websiteUrl + "#organization" 
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${businessName} Electrical Services`,
      "itemListElement": service.detailedInfo.services.map(item => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": item
        }
      }))
    },
    "url": `${websiteUrl}#services`, 
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "North Carolina"
    }
    // You could also add reviews if you have specific service reviews, e.g.:
    // "aggregateRating": {
    //   "@type": "AggregateRating",
    //   "ratingValue": "5",
    //   "reviewCount": "25"
    // }
  };
}