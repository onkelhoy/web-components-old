import os
import sys
import json
import openai
import shutil

# Initialize OpenAI API client
openai.api_key = sys.argv[1]

def read_file_content(filename):
    with open(f"{sys.argv[3]}/src/{filename}", "r") as file:
        content = file.read()
    return content

def getSourceCode():
    return read_file_content("component.ts")
def getStylecode():
    return read_file_content("style.scss")
def getTypeCode():
    return read_file_content("types.ts")
def getRegisterCode():
    return read_file_content("register.ts")

def getStyleQuestion():
    sourcecode = getSourceCode()
    stylecode = getStylecode()

    return f"PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!\n Based on the source code and style code probided. Can you create a documentation that includes titles, short descrition and the table for each tables: css-variables, parts, slots.\ncss-variables should be a table with columns: (name, default-value, type - ex. CSS unit, description).\nparts should include all elements that have been exposed with the part attribute ex: <p part='foo'> - and the table should then include columns: (name, description (short)).\nslots should include columns: (name, default-value, description)\n\n## SOURCE-CODE:\n{sourcecode}\n## STYLE-CODE:\n{stylecode}"

def getLogicQuestion():
    sourcecode = getSourceCode()
    typecode = getTypeCode()

    return f"PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!\n Based on the source code and the types can you give me the following tables. \n1. properties (columns: name, default-value, type, description) \n2. events (columns: name - ex: 'click', type - ex: CustomEvent<ClickEvent>, description - when its being triggered etc) \n3.public functions (columns: name, arguments - ex: arg1:CustomType, arg2?: boolean = true, arg3?: string, description - breif explenation what it does)\n\n## SOURCE-CODE:\n {sourcecode}\n\n## TYPE-CODE: {typecode}"

def getIntroQuestion():
    sourcecode = getSourceCode()
    registercode = getRegisterCode()

    return f"PRE: just start the task given, dont include any starting lines so I can just copy your answer as it is!\n Based on the source code and register code provided to you - could you create a rather simple introduction text with maybe a code example how to use in html - keep it very simple. Do not give example how to run the register code it's already included (this is for you so you can see the element-tag)! The introduction should be read by developers so it needs not to be simple enough for beginners!\n\n## SOURCE-CODE:\n{sourcecode}\n## REGISTER-CODE:\n{registercode}"

# Define the question types
question_types = {
    "styles": getStyleQuestion,
    "logic": getLogicQuestion,
    "intro": getIntroQuestion,
}

def ask_gpt4(question):
    response = openai.Completion.create(
        engine="gpt-3.5-turbo",
        prompt=question,
        # max_tokens=150,
        # n=1,
        # stop=None,
        # temperature=0.5,
    )
    # .strip()
    return response.choices[0].text

def get_version_from_package_json():
    with open(f"{sys.argv[3]}/package.json", "r") as f:
        package_data = json.load(f)
        return package_data["version"]

def main():
    if sys.argv[2] not in question_types:
        print("Usage: python3 main.py [styles|logic|intro]")
        sys.exit(1)

    question_type = sys.argv[2]
    project_scope = sys.argv[3]

    question = question_types[question_type]()
    # version = get_version_from_package_json()

    filename = f"{project_scope}/views/doc/auto/{question_type}.md"
    # filename = f"{project_scope}/doc/{question_type}/{version}.md"
    # backup_filename = f"{project_scope}/doc/{question_type}/{version}.copy.md"

    # if os.path.exists(filename):
    #     shutil.copyfile(filename, backup_filename)

    # once the api is working well
    # answer = ask_gpt4(question)
    answer = question
    
    with open(filename, "w") as f:
        f.write(answer)

if __name__ == "__main__":
    main()
