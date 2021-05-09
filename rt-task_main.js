/* Change 1: Adding the image hosting site */
// define the site that hosts stimuli images
// usually https://<your-github-username>.github.io/<your-experiment-name>/
var repo_site = "https://Grten.github.io/Color-Change/"; 

/* create timeline */
var timeline = [];

/* define welcome message trial */
var welcome_block = {
    type: "html-keyboard-response",
    stimulus: "Welcome to the experiment. Press any key to begin."
};
timeline.push(welcome_block);

/* define instructions trial */
var instructions = {
    type: "html-keyboard-response",
    stimulus: "<p>In this experiment, a Colour will appear in the center " +
        "of the screen.</p><p>You Click The Spacebar as fast as you can " +
        "</div>" +
        "<p>Press any key to begin.</p>",
    post_trial_gap: 2000
};
timeline.push(instructions);

/* test trials */

var test_stimuli = [{
        stimulus: repo_site + "img/blue.png", // Change 3: Adding `repo_site` in `test_stimuli`
        data: {
            test_part: 'test',
            correct_response: ALL_KEYS
        }
    },
    {
        stimulus: repo_site + "img/orange.png", // Change 3: Adding `repo_site` in `test_stimuli`
        data: {
            test_part: 'test',
            correct_response: ALL_KEYS
        }
    }
];

var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="font-size:60px;">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration: function () {
        return jsPsych.randomization.sampleWithoutReplacement([250, 500, 750, 1000, 1250, 1500, 1750, 2000], 1)[0];
    },
    data: {
        test_part: 'fixation'
    }
}

var test = {
    type: "image-keyboard-response",
    stimulus: jsPsych.timelineVariable('stimulus'),
    choices: [ALL_KEYS],
    data: jsPsych.timelineVariable('data'),
    on_finish: function (data) {
        data.correct = data.key_press == jsPsych.pluginAPI.convertKeyCharacterToKeyCode(data.correct_response);
    },
}

var test_procedure = {
    timeline: [fixation, test],
    timeline_variables: test_stimuli,
    repetitions: 5,
    randomize_order: true
}
timeline.push(test_procedure);

/* define debrief */

var debrief_block = {
    type: "html-keyboard-response",
    stimulus: function () {

        var trials = jsPsych.data.get().filter({
            test_part: 'test'
        });
        var correct_trials = trials.filter({
            correct: true
        });
        var accuracy = Math.round(correct_trials.count() / trials.count() * 100);
        var rt = Math.round(correct_trials.select('rt').mean());

        return "<p>You responded correctly on " + accuracy + "% of the trials.</p>" +
            "<p>Your average response time was " + rt + "ms.</p>" +
            "<p>Press any key to complete the experiment. Thank you!</p>";

    }
};
timeline.push(debrief_block);
