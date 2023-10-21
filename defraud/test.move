// Tests
    #[test]
    public fun test_module_init() {
        use sui::test_scenario;

        let admin = @0xADM;
        let client = @0xCLIENT;
        let retailer = @0xRETLR;
        let bank = @0xBANK;
        let refunder = @0xREFNDR;

        // Initialization test
        let scenario_val = test_scenario::begin(admin);
        let scenario = &mut scenario_val;
        {
            init(test_scenario::ctx(scenario));
        };
        
        // Creation test
        test_scenario::next_tx(scenario, admin);
        {
            // Extract the Forge object
            let forge = test_scenario::take_from_sender<Forge>(scenario);
            // Verify number of created swords
            assert!(swords_created(&forge) == 0, 1);
            // Return the Forge object to the object pool
            test_scenario::return_to_sender(scenario, forge);
        };

        // Refund test
        test_scenario::next_tx(scenario, admin);
        {
            // Extract the Forge object
            let forge = test_scenario::take_from_sender<Forge>(scenario);
            // Verify number of created swords
            assert!(swords_created(&forge) == 0, 1);
            // Return the Forge object to the object pool
            test_scenario::return_to_sender(scenario, forge);
        };

        // Claim from bank test
        test_scenario::next_tx(scenario, admin);
        {
            // Extract the Forge object
            let forge = test_scenario::take_from_sender<Forge>(scenario);
            // Verify number of created swords
            assert!(swords_created(&forge) == 0, 1);
            // Return the Forge object to the object pool
            test_scenario::return_to_sender(scenario, forge);
        };

        test_scenario::end(scenario_val);
    }
