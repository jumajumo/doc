package de.jumajumo.doc;

import java.io.*;
import java.nio.file.*;

public class TemplateProcessor {
    public static void main(String[] args) throws IOException {
        // Read the template.html
        String template = new String(Files.readAllBytes(Paths.get("static/article-template.html")));

        // Folder where AsciiDoc-generated HTML files are stored
        File inputDir = new File("target/generated-html");
        File outputDir = new File("target/processed-html");
        outputDir.mkdirs(); // Ensure output directory exists

        // Process each AsciiDoc-generated HTML file
        for (File file : inputDir.listFiles()) {
            if (file.getName().endsWith(".html")) {
                // Read the generated content
                String content = new String(Files.readAllBytes(file.toPath()));

                int indexStart = content.indexOf("body class=\"article\"") + 21;
                int indexEnd = content.indexOf("/body") - 1;

                // Replace placeholder in template
                String finalHtml = template.replace("{{content}}", content.substring(indexStart, indexEnd));

                // Save the final processed file
                File outputFile = new File(outputDir, file.getName());
                Files.write(outputFile.toPath(), finalHtml.getBytes());

                System.out.println("Processed: " + outputFile.getPath());
            }
        }
    }
}