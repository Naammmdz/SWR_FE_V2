package com.example.schoolhealth.repositories;

import com.example.schoolhealth.models.VaccinationCampaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VaccinationCampaignRepository extends JpaRepository<VaccinationCampaign, Long> {
}
