export default [
    {"id":"who", "response":["only_me","me_and_some_others","others_but_not_me"]},
    {"id":"whoiam", "response":["attendee_and_decision_maker","attendee_but_not_decision_maker"]},
    {"id":"whoiam2","response":["attendee_and_decision_maker","attendee_but_not_decision_maker"]},
    {"id":"whoiam3","response":["decision_maker","asker_but_not_decision_maker"]},
    {"id":"payer_1","id2":"payer_2","response":["i_pay","my_company_pay","organism_pay","i_dont_know_who_pay"],"condition":["others_but_not_me"]},
    {"id":"how_you_pay_1","id2":"how_you_pay_2","response":["i_pay_with_my_money","i_pay_with_my_cpf"],"condition":["others_but_not_me"]},
    {"id":"how_company_pay_1","id2":"how_company_pay_2", "response":["i_dont_know_if_my_company_will_ask_payer_organism","my_company_will_ask_payer_organism"],"condition":["others_but_not_me"]},
    {"id":"what_organism_pay1_1","id2":"what_organism_pay1_2", "response":["organism_name","i_dont_know_organism_name"],"condition":["others_but_not_me"]},
    {"id":"what_amount_will_you_pay_1","id2":"what_amount_will_you_pay_2", "response":["budget"],"condition":["others_but_not_me"]},
    {"id":"what_cpf_amount_will_you_pay_1","id2":"what_cpf_amount_will_you_pay_2", "response":["budget"],"condition":["others_but_not_me"]},
    {"id":"what_organism_pay2_1","id2":"what_organism_pay2_2", "response":["organism_name","i_dont_know_organism_name"],"condition":["others_but_not_me"]},
    {"id":"how_many_attendees", "response":["i_dont_know_how_many_attendees","attendees_number"]},
    {"id":"what_relation_type_with_attendees_1","id2":"what_relation_type_with_attendees_2", "id3":"what_relation_type_with_attendees_3","response":["professional_relation_type","personal_relation_type"]},
    {"id":"what_relation_position_with_attendees_1","id2":"what_relation_position_with_attendees_2","id3":"what_relation_position_with_attendees_3", "response":["relation_position"]},
    {"id":"what_relation_level_with_attendees_1","id2":"what_relation_level_with_attendees_2","id3":"what_relation_level_with_attendees_3", "response":["relation_type"]},
    {"id":"what_situation_1","id2":"what_situation_2","id3":"what_situation_3","id4":"what_situation_4", "response":["salaried_not_owner","entrepreneur_ceo_associate","other_situation"]},
    {"id":"what_salaried_status_1","id2":"what_salaried_status_2","id3":"what_salaried_status_3","id4":"what_salaried_status_4", "response":["contract","spectacle_temp_contract","salary_portage","reclassification","professional_transition","other_salaried_status"]},
    {"id":"what_non_salaried_status_1","id2":"what_non_salaried_status_2","id3":"what_non_salaried_status_3","id4":"what_non_salaried_status_4","id5":"what_non_salaried_status_5", "response":["micro-company","sarl","sas","other_non_salaried"]},
    {"id":"what_other_status_1","id2":"what_other_status_2","id3":"what_other_status_3","id4":"what_other_status_4","response":["retired","student","unemployed","other_status"]},
    {"id":"what_reasons_for_training_1","id2":"what_reasons_for_training_2","id3":"what_reasons_for_training_3","id4":"what_reasons_for_training_4","response":["personal_reasons","professional_reasons"]},
    {"id":"what_personal_reasons_1","id2":"what_personal_reasons_2","id3":"what_personal_reasons_3","id4":"what_personal_reasons_4","response":["want_to_find_job","want_to_stay_active","want_to_realize_project","want_for_other_reason"]},
    {"id":"what_professional_reasons_1","id2":"what_professional_reasons_2","id3":"what_professional_reasons_3","id4":"what_professional_reasons_4","response":["want_to_gap_lacks","want_to_develop_professional_comfort","want_to_react_to_my_environment","want_to_develop_my_career","want_to_work_on_a_project_which_ask_skill","want_to_get_a_specific_job"]},
    {"id":"when_1","id2":"when_2","id3":"when_3","response":["as_soon_as_possible","i_dont_know_if_i_want_to_train_soon","as_soon_you_can_suggest_me_a_date","i_have_a_date_i_want"]},
    {"id":"what_date","response":["desired_date"]},
    {"id":"what_duration_1","id2":"what_duration_2","response":["some_hours","some_days","some_weeks","some_months"]},
    {"id":"what_exact_duration_1","id2":"what_exact_duration_2","id3":"what_exact_duration_3","id4":"what_exact_duration_4","id5":"what_exact_duration_5","response":["duration"]},
]
